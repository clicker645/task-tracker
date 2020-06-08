import { IBaseRepository } from '../../../base.repository.interface';
import { IDocumentHistory } from '../interfaces/document-history.interface';
import { DocumentHistoryDto } from '../dto/create-document-history.dto';

export type IHistoryRepository = IBaseRepository<
  IDocumentHistory,
  DocumentHistoryDto
>;
