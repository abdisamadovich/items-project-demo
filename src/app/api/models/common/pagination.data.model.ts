export interface PaginationMetaData {
    hasPrevious: boolean;
    hasNext: boolean;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
  }