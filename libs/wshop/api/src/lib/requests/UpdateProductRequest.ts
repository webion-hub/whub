export interface UpdateProductRequest {
  readonly name: string;
  readonly description?: string;
  readonly price?: number;
  readonly code: string;
}