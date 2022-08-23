import { ProductsEndpoint } from "./endpoints/ProductsEndpoint";
import { CategoriesEndpoint } from "./endpoints/CategoriesEndpoint";
import { ApiBase, ApiConfig } from "@whub/apis/core";

export class WShopApi extends ApiBase {
  constructor(config: ApiConfig) {
    super(config)
  }

  get products() {
    return new ProductsEndpoint(this.client);
  }

  get categories() {
    return new CategoriesEndpoint(this.client);
  }
}
