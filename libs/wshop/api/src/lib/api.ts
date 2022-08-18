import axios, { AxiosInstance } from "axios";
import { ProductsEndpoint } from "./endpoints/ProductsEndpoint";
import { ApiConfig } from "./settings/api-config";

export class WShopApi {
  private readonly client: AxiosInstance;

  constructor(config: ApiConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
    });
  }

  get Products() {
    return new ProductsEndpoint(this.client);
  }
}