import axios, { AxiosInstance } from "axios";
import { ApiConfig } from "./settings/api-config";

export class ApiBase {
  protected readonly client: AxiosInstance;

  constructor(config: ApiConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
    });
  }
}
