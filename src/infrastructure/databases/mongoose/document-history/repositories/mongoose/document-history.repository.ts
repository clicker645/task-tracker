import { IHistoryRepository } from '../document-history.repository.interface';
import { PaginateModel, PaginateResult } from 'mongoose';
import { BaseRepository } from '../../../repository/base.repository';
import { IDocumentHistory } from '../../interfaces/document-history.interface';
import { DocumentHistoryDto } from '../../dto/create-document-history.dto';
import { PaginationOptions } from '../../../pagination/paginate.params';

export class DocumentHistoryRepository
  extends BaseRepository<IDocumentHistory, DocumentHistoryDto>
  implements IHistoryRepository {
  constructor(private historyModel: PaginateModel<IDocumentHistory>) {
    super(historyModel);
  }

  async getHistoryByDocId(
    _id: string,
    options: PaginationOptions,
  ): Promise<PaginateResult<IDocumentHistory>> {
    return await this.historyModel.paginate(
      {
        document: _id,
      },
      options,
    );
  }
}
