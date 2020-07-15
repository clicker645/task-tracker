import { IBaseRepository } from '../../../infrastructure/databases/base.repository.interface';
import { PaginationOptions } from '../../../infrastructure/databases/mongoose/pagination/paginate.params';
import { DocumentHistory } from '../document-history.entity';
import { PaginatedType } from '../../../infrastructure/databases/mongoose/pagination/pagination.output';

export interface IHistoryRepository extends IBaseRepository<DocumentHistory> {
  getHistoryByDocId(
    _id: string,
    options: PaginationOptions,
  ): Promise<PaginatedType<DocumentHistory>>;
}
