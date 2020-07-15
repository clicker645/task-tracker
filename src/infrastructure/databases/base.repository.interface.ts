import { FilterQuery } from 'mongoose';

import { PaginatedType } from './mongoose/pagination/pagination.output';
import { PaginationOptions } from './mongoose/pagination/paginate.params';

export interface IBaseRepository<T> {
  findOne(query: FilterQuery<T>): Promise<T>;
  findById(id: string): Promise<T>;
  delete(_id: string): Promise<any>;
  update(_id: string, payload: Partial<T>): Promise<T>;
  create(model: T): Promise<T>;
  findAll(
    query: FilterQuery<T>,
    pagination: PaginationOptions,
  ): Promise<PaginatedType<T>>;
}
