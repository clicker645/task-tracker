import { IHistoryRepository } from '../document-history.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { BaseRepository } from '../../../repository/base.repository';
import { IDocumentHistory } from '../../interfaces/document-history.interface';
import { DocumentHistoryDto } from '../../dto/create-document-history.dto';
import { PaginationOptions } from '../../../pagination/paginate.params';
import { ModelsEnum } from '../../../../../../models/models.enum';

@Injectable()
export class DocumentHistoryRepository
  extends BaseRepository<IDocumentHistory, DocumentHistoryDto>
  implements IHistoryRepository {
  constructor(
    @InjectModel(ModelsEnum.DOCUMENT_HISTORY)
    private historyModel: PaginateModel<IDocumentHistory>,
  ) {
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
