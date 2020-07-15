import { Document } from 'mongoose';

import { DocumentHistoryDto } from './dto/create-document-history.dto';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { IHistoryRepository } from './repositories/document-history.repository.interface';
import { PaginatedType } from '../../infrastructure/databases/mongoose/pagination/pagination.output';
import { DocumentHistory } from './document-history.entity';

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
        user: userId,
        target: key,
        from: oldItem[key],
        to: value,
        document: oldItem._id,
        modelName: model,
      };

      return await this.docHistoryRepository.create(
        (dto as unknown) as DocumentHistory,
      );
    }
  }

  async getHistoryByDocId(
    id: string,
    options: PaginationOptions,
  ): Promise<PaginatedType<DocumentHistory>> {
    return await this.docHistoryRepository.getHistoryByDocId(id, options);
  }
}
