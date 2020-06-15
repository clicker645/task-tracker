import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { IItem } from './interfaces/item.interface';
import { CreateItemDto } from './dto/create-item.dto';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { AuthService } from '../auth/auth.service';
import { ShareService } from '../share/share.service';
import { AccessType } from '../share/enums/access-type.enum';
import { DocumentHistoryService } from '../../infrastructure/databases/mongoose/document-history/document-history.service';
import { ModelsEnum } from '../../models/models.enum';
import { IDocumentHistory } from '../../infrastructure/databases/mongoose/document-history/interfaces/document-history.interface';
import { Request } from 'express';
import { dictionary } from '../../config/dictionary';
import * as mongoose from 'mongoose';
import { IItemRepository } from './repositories/item.repository.interface';

export class ItemService {
  constructor(
    private readonly itemRepository: IItemRepository,
    private readonly authService: AuthService,
    private readonly shareService: ShareService,
    private readonly docHistoryService: DocumentHistoryService,
  ) {}

  async create(req: Request, dto: CreateItemDto): Promise<IItem> {
    try {
      const currentUser = await this.authService.getUserFromAuthorization(req);
      if (!dto.userId) {
        dto.userId = mongoose.Types.ObjectId(currentUser._id);
      }

      if (currentUser._id !== dto.userId.toString()) {
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
    req: Request,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    const sharedItemsId: string[] = [];
    const data = await this.shareService.getSharedItemByUser(req, pagination);
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
    req: Request,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    try {
      const currentUser = await this.authService.getUserFromAuthorization(req);
      return this.itemRepository.getByUser(currentUser._id, pagination);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async update(
    req: Request,
    _id: string,
    payload: Partial<IItem>,
  ): Promise<IItem> {
    const currentUser = await this.authService.getUserFromAuthorization(req);
    const currentItem = await this.itemRepository.findById(_id);

    if (
      currentItem.userId.toString() === currentUser._id.toString() ||
      (await this.shareService.checkPermission(
        currentUser._id,
        currentItem._id,
        AccessType.ReadWrite,
      ))
    ) {
      try {
        const oldItem = await this.itemRepository.findById(_id);
        const result = await this.itemRepository.update(_id, payload);
        this.docHistoryService
          .saveChangeHistory(ModelsEnum.ITEM, currentUser._id, oldItem, payload)
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

  async delete(req: Request, _id: string): Promise<any> {
    try {
      const currentUser = await this.authService.getUserFromAuthorization(req);
      const currentItem = await this.itemRepository.findById(_id);
      if (currentUser._id !== currentItem.userId.toString()) {
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
