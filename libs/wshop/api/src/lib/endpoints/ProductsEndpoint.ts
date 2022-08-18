import { AxiosInstance } from "axios";
import { Product } from "../model/product";
import { UpdateProductRequest } from "../requests/update-product-request";
import { ProductEndpoint } from "./ProductEndpoint";

export class ProductsEndpoint {
  constructor (private readonly client: AxiosInstance) {}

  withId(id: number) {
    return new ProductEndpoint(this.client, id);
  }

  create(request: UpdateProductRequest) {
    return this.client.post<Product>('shop/products', request);
  }

  list() {
    return this.client.get<Product>('shop/products');
  }
}