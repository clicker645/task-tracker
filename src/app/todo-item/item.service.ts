import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { IItem } from './interfaces/item.interface';
import { CreateItemDto } from './dto/create-item.dto';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { ShareService } from '../share/share.service';
import { AccessType } from '../share/enums/access-type.enum';
import { DocumentHistoryService } from '../../infrastructure/databases/mongoose/document-history/document-history.service';
import { ModelsEnum } from '../../models/models.enum';
import { IDocumentHistory } from '../../infrastructure/databases/mongoose/document-history/interfaces/document-history.interface';
import { dictionary } from '../../config/dictionary';
import * as mongoose from 'mongoose';
import { IItemRepository } from './repositories/item.repository.interface';

export class ItemService {
  constructor(
    private readonly itemRepository: IItemRepository,
    private readonly shareService: ShareService,
    private readonly docHistoryService: DocumentHistoryService,
  ) {}

  async create(currentUserId: string, dto: CreateItemDto): Promise<IItem> {
    try {
      if (!dto.userId) {
        dto.userId = mongoose.Types.ObjectId(currentUserId);
      }

      if (currentUserId !== dto.userId.toString()) {
        throw new BadRequestException(
          dictionary.errors.createItemForAnotherUserError,
        );
      }

      return await this.itemRepository.create(dto);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async get(pagination: PaginationOptions): Promise<PaginateResult<IItem>> {
    try {
      return this.itemRepository.findAll({}, pagination);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getSharedItems(
    currentUserId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    const sharedItemsId: string[] = [];
    const data = await this.shareService.getSharedItemByUser(
      currentUserId,
      pagination,
    );
    data.docs.forEach(sharedItem => {
      sharedItemsId.push(sharedItem.itemId);
    });

    try {
      return await this.itemRepository.findAll(
        {
          _id: sharedItemsId,
        },
        {},
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getByUser(
    currentUserId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    try {
      return this.itemRepository.getByUser(currentUserId, pagination);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async update(
    currentUserId: string,
    _id: string,
    payload: Partial<IItem>,
  ): Promise<IItem> {
    const currentItem = await this.itemRepository.findById(_id);

    if (
      currentItem.userId.toString() === currentUserId.toString() ||
      (await this.shareService.checkPermission(
        currentUserId,
        currentItem._id,
        AccessType.ReadWrite,
      ))
    ) {
      try {
        const oldItem = await this.itemRepository.findById(_id);
        const result = await this.itemRepository.update(_id, payload);
        this.docHistoryService
          .saveChangeHistory(ModelsEnum.ITEM, currentUserId, oldItem, payload)
          .catch(e => {
            console.log(e);
          });

        return result;
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    }

    throw new ForbiddenException(dictionary.errors.permissionForModifyError);
  }

  async delete(currentUserId: string, _id: string): Promise<any> {
    try {
      const currentItem = await this.itemRepository.findById(_id);
      if (currentUserId !== currentItem.userId.toString()) {
        throw new ForbiddenException(
          dictionary.errors.permissionForModifyError,
        );
      }

      return this.itemRepository.delete(_id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getHistoryBy(
    id: string,
    options: PaginationOptions,
  ): Promise<PaginateResult<IDocumentHistory>> {
    try {
      return this.docHistoryService.getHistoryByDocId(id, options);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
