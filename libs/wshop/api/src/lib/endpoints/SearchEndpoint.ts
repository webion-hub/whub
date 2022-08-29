import { Endpoint } from "@whub/apis-core";
import { Product } from "../model/Product";

export class SearchEndpoint extends Endpoint {
  private readonly mapper: Product

  get url(): string {
    return `shop/products/search`;
  }

  async search(request: SearchRequest) {
    return this.client
      .get<Product[]>(this.url, request)
      .then(r => );
  }
}
