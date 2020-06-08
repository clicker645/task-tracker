import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { IItem } from './interfaces/item.interface';
import { CreateItemDto } from './dto/create-item.dto';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { ItemRepository } from './repositories/mongoose/item.repository';
import { AuthService } from '../auth/auth.service';
import { ShareService } from '../share/share.service';
import { AccessType } from '../share/enums/access-type.enum';
import { DocumentHistoryService } from '../../infrastructure/databases/mongoose/document-history/document-history.service';
import { ModelsEnum } from '../../models/models.enum';
import { IDocumentHistory } from '../../infrastructure/databases/mongoose/document-history/interfaces/document-history.interface';
@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly authService: AuthService,
    private readonly shareService: ShareService,
    private readonly docHistoryService: DocumentHistoryService,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<IItem> {
    try {
      return await this.itemRepository.create(createItemDto);
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
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    const sharedItemsId: string[] = [];
    const data = await this.shareService.getSharedItemByUser(userId);
    data.docs.forEach(sharedItem => {
      sharedItemsId.push(sharedItem.itemId);
    });

    try {
      return await this.itemRepository.findAll(
        {
          _id: sharedItemsId,
        },
        pagination,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getByUser(
    token: string,
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    try {
      const currentUser = await this.authService.getCurrentUser(token);
      if (userId !== currentUser._id) {
        throw new ForbiddenException(
          "Error: you can't get items from another users",
        );
      }

      return this.itemRepository.getByUser(userId, pagination);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async update(token, _id: string, payload: Partial<IItem>): Promise<IItem> {
    const currentUser = await this.authService.getCurrentUser(token);
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

    throw new ForbiddenException(
      'Error: you dont have permissions for update this todo-item.',
    );
  }

  async delete(_id: string): Promise<any> {
    try {
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
      return await this.docHistoryService.getHistoryByDocId(id, options);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
