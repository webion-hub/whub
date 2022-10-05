import { AxiosInstance } from "axios";

export abstract class Endpoint {
  abstract get url(): string;

  constructor(
    protected readonly client: AxiosInstance,
  ) {}

  get fullUrl() {
    return `${this.client.defaults.baseURL}/${this.url}`;
  }

  protected at(path: string) {
    return `${this.url}/${path}`;
  }
}