import { AxiosInstance } from "axios";

export abstract class Endpoint {
  abstract get url(): string;

  constructor(
    protected readonly client: AxiosInstance,
  ) {}
}