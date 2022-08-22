import axios, { AxiosInstance } from "axios";
import { ProductsEndpoint } from "./endpoints/ProductsEndpoint";
import { ApiConfig } from "./settings/api-config";
import {CategoriesEndpoint} from "./endpoints/CategoriesEndpoint";

export class WShopApi {
  private readonly client: AxiosInstance;

  constructor(config: ApiConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
    });
  }

  get products() {
    return new ProductsEndpoint(this.client);
  }

  get categories() {
    return new CategoriesEndpoint(this.client);
  }
}
