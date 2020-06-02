import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { IItem } from './interfaces/item.interface';
import { CreateItemDto } from './dto/create-item.dto';
import { PaginationOptions } from '../../components/pagination/paginate.params';
import { ItemRepository } from './repositories/mongoose/item.repository';
import { AuthService } from '../auth/auth.service';
import { ShareService } from '../share/share.service';
import { AccessType } from '../share/enums/access-type.enum';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly authService: AuthService,
    private readonly shareService: ShareService,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<IItem> {
    return await this.itemRepository.create(createItemDto);
  }

  async get(pagination: PaginationOptions): Promise<PaginateResult<IItem>> {
    return this.itemRepository.findAll({}, pagination);
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

    return await this.itemRepository.findAll(
      {
        _id: sharedItemsId,
      },
      pagination,
    );
  }

  async getByUser(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    try {
      return this.itemRepository.getByUser(userId, pagination);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async update(token, _id: string, payload: Partial<IItem>): Promise<IItem> {
    const currentUser = await this.authService.getCurrentUser(token);
    const currentItem = await this.itemRepository.findById(_id);

    if (
      currentItem.uId.toString() === currentUser._id.toString() ||
      (await this.shareService.checkPermission(
        currentUser._id,
        currentItem._id,
        AccessType.ReadWrite,
      ))
    ) {
      return this.itemRepository.update(_id, payload);
    }

    throw new ForbiddenException(
      'Error: you dont have permissions for update this item.',
    );
  }

  async delete(_id: string): Promise<any> {
    return this.itemRepository.delete(_id);
  }
}
