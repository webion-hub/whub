import { AxiosInstance } from "axios";
import { Endpoint } from "@whub/apis/core";
import { Product } from "../model/product";
import { UpdateProductRequest } from "../requests/UpdateProductRequest";
import { ProductEndpoint } from "./ProductEndpoint";

export class ProductsEndpoint extends Endpoint {
  constructor (client: AxiosInstance) {
    super(client);
  }

  get url() {
    return 'shop/products';
  }


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
