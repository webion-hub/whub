import { AxiosInstance } from "axios";
import { Endpoint } from "@whub/apis-core";
import { Product } from "../model/Product";
import { UpdateProductRequest } from "../requests/UpdateProductRequest";
import { ProductDetailsEndpoint } from "./ProductDetailsEndpoint";
import { ProductImagesEndpoint } from "./ProductImagesEndpoint";
import { UpdateRelatedProductsRequest } from "../requests/UpdateRelatedProductsRequest";

export class ProductEndpoint extends Endpoint {
  constructor(
    client: AxiosInstance,
    private readonly productId: number,
  ) {
    super(client);
  }

  get url() {
    return `products/${this.productId}`;
  }

  get images() {
    return new ProductImagesEndpoint(this.client, this.productId);
  }

  get details() {
    return new ProductDetailsEndpoint(this.client, this.productId);
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

  updateRelatedProducts(request: UpdateRelatedProductsRequest) {
    return this.client.put(`${this.url}/related_products`, request);
  }
}
