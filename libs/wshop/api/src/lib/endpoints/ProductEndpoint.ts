import { AxiosInstance } from "axios";
import { Endpoint } from "@whub/apis-core";
import { Product } from "../model/Product";
import { UpdateProductRequest } from "../requests/UpdateProductRequest";
import { ProductDetailsEndpoint } from "./ProductDetailsEndpoint";
import { ProductImagesEndpoint } from "./ProductImagesEndpoint";
import { UpdateRelatedProductsRequest } from "../requests/UpdateRelatedProductsRequest";
import { ProductAttachmentsEndpoint } from "./ProductAttachmentsEndpoint";
import { ProductMapper } from "../mappings/ProductMapper";

export class ProductEndpoint extends Endpoint {
  private readonly mapper: ProductMapper;
  
  constructor(
    client: AxiosInstance,
    private readonly productId: number,
  ) {
    super(client);
    this.mapper = new ProductMapper(client);
  }

  get url() {
    return `shop/products/${this.productId}`;
  }

  get images() {
    return new ProductImagesEndpoint(this.client, this.productId);
  }

  get details() {
    return new ProductDetailsEndpoint(this.client, this.productId);
  }

  get attachments() {
    return new ProductAttachmentsEndpoint(this.client, this.productId);
  }


  async load() {
    return this.client
      .get<Product>(this.url)
      .then(r => this.mapper.mapOne(r));
  }

  async update(request: UpdateProductRequest) {
    return this.client
      .put<Product>(this.url, request)
      .then(r => this.mapper.mapOne(r));
  }

  delete() {
    return this.client.delete(this.url);
  }

  updateRelatedProducts(request: UpdateRelatedProductsRequest) {
    return this.client.put(`${this.url}/related_products`, request);
  }
}
