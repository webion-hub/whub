import { AxiosInstance } from "axios";

export class ProductImageEndpoint {
  private get url() {
    return `shop/products/${this.productId}/images/${this.imageId}`
  };

  constructor(
    private readonly client: AxiosInstance,
    private readonly productId: number,
    private readonly imageId: number,
  ) {}

  delete() {
    return this.client.delete(this.url);
  }
}