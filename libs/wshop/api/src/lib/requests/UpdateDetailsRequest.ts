export interface UpdateDetailsRequest {
  readonly details: ProductDetailUpdate[];
}

export interface ProductDetailUpdate {
  readonly title: string;
  readonly description?: string;
}