import { IBaseRepository } from '../../../base.repository.interface';
import { IDocumentHistory } from '../interfaces/document-history.interface';
import { DocumentHistoryDto } from '../dto/create-document-history.dto';
import { PaginationOptions } from '../../pagination/paginate.params';
import { PaginateResult } from 'mongoose';

export interface IHistoryRepository
  extends IBaseRepository<IDocumentHistory, DocumentHistoryDto> {
  getHistoryByDocId(
    _id: string,
    options: PaginationOptions,
  ): Promise<PaginateResult<IDocumentHistory>>;
}
