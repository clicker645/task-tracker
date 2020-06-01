import { IBaseRepository } from './interfaces/base.repository.interface';
import { PaginateModel, PaginateResult, Document, FilterQuery } from 'mongoose';
import { PaginationOptions } from '../pagination/paginate.params';

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
    // @ts-ignore
    return this.model.deleteOne({ _id });
  }

  async update(_id: string, payload: Partial<T>): Promise<T> {
    // @ts-ignore
    return this.model.updateOne({ _id }, payload);
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