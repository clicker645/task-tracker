import * as mongoose from 'mongoose';
import { DocumentHistoryDto } from './dto/create-document-history.dto';
import { Document, PaginateResult } from 'mongoose';
import { PaginationOptions } from '../pagination/paginate.params';
import { IDocumentHistory } from './interfaces/document-history.interface';
import { IHistoryRepository } from './repositories/document-history.repository.interface';

export class DocumentHistoryService {
  constructor(private readonly docHistoryRepository: IHistoryRepository) {}

  async saveChangeHistory(
    model: string,
    userId: string,
    oldItem: Document,
    newData: Record<string, any>,
  ) {
    for (const [key, value] of Object.entries(newData)) {
      const dto: DocumentHistoryDto = {
        user: mongoose.Types.ObjectId(userId),
        target: key,
        from: oldItem[key],
        to: value,
        document: oldItem._id,
        modelName: model,
      };

      console.log(dto);

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
