import axios, { AxiosInstance } from "axios";
import { ApiConfig } from "../settings/ApiConfig";

export abstract class ApiBase {
  protected readonly client: AxiosInstance;

  constructor(config: ApiConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      withCredentials: config.withCredentials,
    });
  }
}
