import { AxiosInstance } from "axios";
import { Endpoint } from "@whub/apis-core";

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

  src() {
    return `${this.client.defaults.baseURL}/${this.url}`;
  }

  delete() {
    return this.client.delete(this.url);
  }
}
