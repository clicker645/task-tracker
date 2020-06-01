import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { IItem } from './interfaces/item.interface';
import { CreateItemDto } from './dto/create-item.dto';
import { PaginationOptions } from '../../components/pagination/paginate.params';
import { ItemRepository } from './repositories/mongoose/item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async create(createItemDto: CreateItemDto): Promise<IItem> {
    return this.itemRepository.create(createItemDto);
  }

  async get(pagination: PaginationOptions): Promise<PaginateResult<IItem>> {
    return this.itemRepository.findAll({}, pagination);
  }

  async getByUser(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<IItem>> {
    return this.itemRepository.getByUser(userId, pagination);
  }

  async update(_id: string, payload: Partial<IItem>): Promise<IItem> {
    return this.itemRepository.update(_id, payload);
  }

  async delete(_id: string): Promise<any> {
    return this.itemRepository.delete(_id);
  }
}
