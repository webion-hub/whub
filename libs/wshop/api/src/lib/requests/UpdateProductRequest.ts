export interface UpdateProductRequest {
  readonly name: string;
  readonly categoryId?: number;
  readonly description?: string;
  readonly price?: number;
  readonly code: string;
}