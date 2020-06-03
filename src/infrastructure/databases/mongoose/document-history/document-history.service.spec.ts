import { Test, TestingModule } from '@nestjs/testing';
import { DocumentHistoryService } from './document-history.service';

describe('DocumentHistoryService', () => {
  let service: DocumentHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentHistoryService],
    }).compile();

    service = module.get<DocumentHistoryService>(DocumentHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
