export interface SearchRequest {
  readonly category?: string;
  readonly code?: string;
  readonly query?: string;
  readonly skip: number;
  readonly take: number;
}
