import { AxiosInstance } from "axios";
import { Product } from "../model/product";
import { UpdateProductRequest } from "../requests/UpdateProductRequest";
import { ProductEndpoint } from "./ProductEndpoint";

export class ProductsEndpoint {
  private get url() {
    return 'shop/products';
  }

  constructor (private readonly client: AxiosInstance) {}

  withId(id: number) {
    return new ProductEndpoint(this.client, id);
  }

  create(request: UpdateProductRequest) {
    return this.client.post<Product>(this.url, request);
  }

  list() {
    return this.client.get<Product[]>(this.url);
  }
}
