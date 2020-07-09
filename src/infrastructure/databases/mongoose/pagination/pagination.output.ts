export class PaginatedType<T> {
  docs: T[];

  totalDocs: number;

  limit: number;

  page?: number;

  totalPages: number;

  nextPage?: number;

  prevPage?: number;

  pagingCounter: number;

  hasPrevPage: boolean;

  hasNextPage: boolean;
}
