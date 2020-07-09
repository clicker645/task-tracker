import { PaginatedType } from './mongoose/pagination/pagination.output';
import { FilterQuery, PaginateResult } from 'mongoose';
import { PaginationOptions } from './mongoose/pagination/paginate.params';

export interface IBaseRepository<T, R> {
  findById(id: string): Promise<T>;
  delete(_id: string): Promise<any>;
  update(_id: string, payload: Partial<T>): Promise<T>;
  create(createDto: R): Promise<T>;
  findAll(
    query: FilterQuery<T>,
    pagination: PaginationOptions,
  ): Promise<PaginateResult<T>>;
}

export interface IBaseRepositoryDDD<T> {
  findById(id: string): Promise<T>;
  delete(_id: string): Promise<any>;
  update(_id: string, payload: Partial<T>): Promise<T>;
  create(model: T): Promise<T>;
  findAll(
    query: FilterQuery<T>,
    pagination: PaginationOptions,
  ): Promise<PaginatedType<T>>;
}
