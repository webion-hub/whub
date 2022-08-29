import { Endpoint } from "@whub/apis-core";
import { Product } from "../model/Product";

export class SearchEndpoint extends Endpoint {
  get url(): string {
    return `shop/products/search`;
  }

  async search() {
    return this.client.get<Product[]>(this.url);
  }
}
