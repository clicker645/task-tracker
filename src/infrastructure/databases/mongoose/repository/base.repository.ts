import { PaginateModel, Document, FilterQuery, Types } from 'mongoose';

import { PaginationOptions } from '../pagination/paginate.params';
import { IBaseRepository } from '../../base.repository.interface';
import { IPaginate } from '../pagination/pagination.output';
import { BadRequestException } from '@nestjs/common';
import { dictionary } from '../../../../config/dictionary';

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  protected model: PaginateModel<T>;

  constructor(model: PaginateModel<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T> {
    if (Types.ObjectId.isValid(id)) {
      return await this.model.findById(id).exec();
    }

    throw new BadRequestException(dictionary.errors.incorrectId);
  }

  async delete(_id: string): Promise<any> {
    return this.model.deleteOne({ _id } as FilterQuery<T>);
  }

  async update(_id: string, payload: Partial<T>): Promise<T> {
    return this.model.updateOne({ _id } as FilterQuery<T>, payload);
  }

  async create(payload: T): Promise<T> {
    return await this.model.create(payload);
  }

  async findOne(query: FilterQuery<T>): Promise<T> {
    return this.model.findOne(query);
  }

  async findAll(
    query: FilterQuery<T>,
    pagination: PaginationOptions,
  ): Promise<IPaginate<T>> {
    return await this.model.paginate(query, pagination);
  }
}
