import { PaginateModel } from 'mongoose';

import { IHistoryRepository } from '../document-history.repository.interface';
import { BaseRepository } from '../../../../infrastructure/databases/mongoose/repository/base.repository';
import { PaginationOptions } from '../../../../infrastructure/databases/mongoose/pagination/paginate.params';
import { DocumentHistory } from '../../document-history.entity';
import { IPaginate } from '../../../../infrastructure/databases/mongoose/pagination/pagination.output';

export class MongooseDocumentHistoryRepository
  extends BaseRepository<DocumentHistory>
  implements IHistoryRepository {
  constructor(private historyModel: PaginateModel<DocumentHistory>) {
    super(historyModel);
  }

  async getHistoryByDocId(
    _id: string,
    options: PaginationOptions,
  ): Promise<IPaginate<DocumentHistory>> {
    return await this.historyModel.paginate(
      {
        document: _id,
      },
      options,
    );
  }
}
