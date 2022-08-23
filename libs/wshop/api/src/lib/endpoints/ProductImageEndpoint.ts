import { AxiosInstance } from "axios";
import { Endpoint } from "../abstractions/Endpoint";

export class ProductImageEndpoint extends Endpoint {
  constructor(
    client: AxiosInstance,
    private readonly productId: number,
    private readonly imageId: number,
  ) {
    super(client);
  }

  get url() {
    return `shop/products/${this.productId}/images/${this.imageId}`
  };

  delete() {
    return this.client.delete(this.url);
  }
}