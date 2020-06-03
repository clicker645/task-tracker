import { BadRequestException, Injectable } from '@nestjs/common';
import { DocumentHistoryRepository } from './repositories/mongoose/document-history.repository';
import * as mongoose from 'mongoose';
import { DocumentHistoryDto } from './dto/create-document-history.dto';
import { Document, PaginateResult } from 'mongoose';
import { PaginationOptions } from '../paginate.params';
import { IDocumentHistory } from './interfaces/document-history.interface';

@Injectable()
export class DocumentHistoryService {
  constructor(
    private readonly docHistoryRepository: DocumentHistoryRepository,
  ) {}

  async saveChangeHistory(
    model: string,
    uId: string,
    oldItem: Document,
    newData: Record<string, any>,
  ) {
    for (const [key, value] of Object.entries(newData)) {
      const dto: DocumentHistoryDto = {
        user: mongoose.Types.ObjectId(uId),
        target: key,
        from: oldItem[key],
        to: value,
        changeDate: new Date(Date.now()),
        document: oldItem._id,
        modelName: model,
      };

      return await this.docHistoryRepository.create(dto);
    }
  }

  async getHistoryByDocId(
    id: string,
    options: PaginationOptions,
  ): Promise<PaginateResult<IDocumentHistory>> {
    return await this.docHistoryRepository.getHistoryByDocId(id, options);
  }
}
