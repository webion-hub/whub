import { AxiosInstance } from "axios";
import { Product } from "../model/product";
import { UpdateProductRequest } from "../requests/update-product-request";

export class ProductEndpoint {
  private get url() {
    return `shop/products/${this.productId}`;
  }

  constructor (
    private readonly client: AxiosInstance,
    private readonly productId: number
  ) {}

  
  src() {
    return this.url;
  }

  load() {
    return this.client.get<Product>(this.url);
  }

  delete() {
    return this.client.delete(this.url);
  }

  update(request: UpdateProductRequest) {
    return this.client.put(this.url, request);
  }
}