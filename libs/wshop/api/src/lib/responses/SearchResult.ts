export interface SearchResult<T> {
  readonly results: T[];
  readonly totalResults: number;
}
