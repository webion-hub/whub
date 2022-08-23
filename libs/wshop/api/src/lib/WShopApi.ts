import { ProductsEndpoint } from "./endpoints/ProductsEndpoint";
import { CategoriesEndpoint } from "./endpoints/CategoriesEndpoint";
import { ApiBase } from "@whub/apis/core";

export class WShopApi extends ApiBase {
  get products() {
    return new ProductsEndpoint(this.client);
  }

  get categories() {
    return new CategoriesEndpoint(this.client);
  }
}
