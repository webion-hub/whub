import { AxiosInstance } from "axios";
import { Product } from "../model/product";
import { UpdateProductRequest } from "../requests/update-product-request";
import { ProductImagesEndpoint } from "./ProductImagesEndpoint";

export class ProductEndpoint {
  private get url() {
    return `shop/products/${this.productId}`;
  }

  constructor (
    private readonly client: AxiosInstance,
    private readonly productId: number
  ) {}

  
  get images() {
    return new ProductImagesEndpoint(this.client, this.productId);
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