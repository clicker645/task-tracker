import { PaginatedType } from './../pagination/pagination.output';
import { PaginateModel, Document, FilterQuery, PaginateResult } from 'mongoose';
import { PaginationOptions } from '../pagination/paginate.params';
import {
  IBaseRepository,
  IBaseRepositoryDDD,
} from '../../base.repository.interface';

export class BaseRepository<T extends Document, R>
  implements IBaseRepository<T, R> {
  private model: PaginateModel<T>;

  constructor(model: PaginateModel<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T> {
    return await this.model.findById(id).exec();
  }

  async delete(_id: string): Promise<any> {
    const condition: FilterQuery<{}> = { _id };
    return this.model.deleteOne(condition);
  }

  async update(_id: string, payload: Partial<T>): Promise<T> {
    const condition: FilterQuery<{}> = { _id };
    return this.model.updateOne(condition, payload);
  }

  async create(createDto: R): Promise<T> {
    return await this.model.create(createDto);
  }

  async findAll(
    query: FilterQuery<T>,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<T>> {
    return await this.model.paginate(query, pagination);
  }
}

export class BaseRepositoryDDD<T extends Document>
  implements IBaseRepositoryDDD<T> {
  protected model: PaginateModel<T>;

  constructor(model: PaginateModel<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T> {
    return await this.model.findById(id).exec();
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

  async findAll(
    query: FilterQuery<T>,
    pagination: PaginationOptions,
  ): Promise<PaginatedType<T>> {
    return await this.model.paginate(query, pagination);
  }
}
