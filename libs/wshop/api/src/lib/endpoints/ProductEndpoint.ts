import { AxiosInstance } from "axios";
import { Product } from "../model/product";
import { UpdateProductRequest } from "../requests/update-product-request";

export class ProductEndpoint {
  constructor (
    private readonly client: AxiosInstance,
    private readonly productId: number
  ) {}

  load() {
    return this.client.get<Product>(`shop/products/${this.productId}`);
  }

  delete() {
    return this.client.delete(`shop/products/${this.productId}`);
  }

  update(request: UpdateProductRequest) {
    return this.client.put(`shop/products/${this.productId}`, request);
  }
}