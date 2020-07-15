import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { ShareService } from '../share/share.service';
import { DocumentHistoryService } from '../document-history/document-history.service';
import { modelsEnum } from '../../models/models.enum';
import { dictionary } from '../../config/dictionary';
import { IItemRepository } from './repositories/item.repository.interface';
import { Item } from './item.entity';
import { User } from '../user/user.entity';
import { PaginatedType } from '../../infrastructure/databases/mongoose/pagination/pagination.output';
import { QueryItemDto } from './dto/query-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AccessType } from '../share/share-item.entity';

export class ItemService {
  constructor(
    private readonly itemRepository: IItemRepository,
    private readonly shareService: ShareService,
    private readonly docHistoryService: DocumentHistoryService,
  ) {}

  async create(user: User, dto: CreateItemDto): Promise<Item> {
    try {
      dto.userId = user._id;
      return await this.itemRepository.create(dto as Item);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findAll(
    queryParams: QueryItemDto,
    pagination: PaginationOptions,
  ): Promise<PaginatedType<Item>> {
    try {
      return this.itemRepository.findAll(queryParams, pagination);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getSharedItems(
    user: User,
    pagination: PaginationOptions,
  ): Promise<PaginatedType<Item>> {
    const sharedItemsId: string[] = [];
    const data = await this.shareService.getSharedItemByUser(
      user._id,
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
    user: User,
    pagination: PaginationOptions,
  ): Promise<PaginatedType<Item>> {
    try {
      return this.itemRepository.getByUserId(user._id, pagination);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async update(user: User, _id: string, payload: UpdateItemDto): Promise<Item> {
    const currentItem = await this.itemRepository.findById(_id);

    const accessIsAllowed = await this.shareService.checkPermission(
      user._id,
      currentItem._id,
      AccessType.ReadWrite,
    );

    if (currentItem.userId === user._id || accessIsAllowed) {
      try {
        const oldItem = await this.itemRepository.findById(_id);
        const result = await this.itemRepository.update(_id, payload);
        this.docHistoryService
          .saveChangeHistory(modelsEnum.ITEM, user._id, oldItem, payload)
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

  async delete(user: User, _id: string): Promise<any> {
    try {
      const currentItem = await this.itemRepository.findById(_id);
      if (user._id !== currentItem.userId) {
        throw new ForbiddenException(
          dictionary.errors.permissionForModifyError,
        );
      }

      return this.itemRepository.delete(_id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // async getHistoryBy(
  //   id: string,
  //   options: PaginationOptions,
  // ): Promise<PaginateResult<IDocumentHistory>> {
  //   try {
  //     return this.docHistoryService.getHistoryByDocId(id, options);
  //   } catch (e) {
  //     throw new InternalServerErrorException(e);
  //   }
  // }
}
