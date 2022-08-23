import { AxiosInstance } from "axios";
import { Endpoint } from "../../../../../apis/core/src/lib/abstractions/Endpoint";
import { UpdateDetailsRequest } from "../requests/UpdateDetailsRequest";

export class ProductDetailsEndpoint extends Endpoint {
  constructor(
    client: AxiosInstance,
    private readonly productId: number,
  ) {
    super(client);
  }

  get url() {
    return `shop/products/${this.productId}`;
  }

  update(request: UpdateDetailsRequest) {
    return this.client.put(this.url, request);
  }
}