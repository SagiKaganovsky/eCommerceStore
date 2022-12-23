export interface MetaData {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export class PaginatedResponse<T> {
  items: T;
  metaData: MetaData;
  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
