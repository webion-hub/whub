import { AxiosInstance, AxiosResponse } from "axios";

export abstract class ResponseMapper<T> {
  constructor(
    private readonly client: AxiosInstance
  ) {}
  
  mapOne(r: AxiosResponse<T>): AxiosResponse<T> {
    return {
      ...r,
      data: this.map(r.data)
    };
  }

  mapMany(r: AxiosResponse<T[]>): AxiosResponse<T[]> {
    return {
      ...r,
      data: r.data.map(v => {
        return this.map(v);
      }),
    };
  }
  
  abstract map(data: T): T;

  protected mapUrl(path: string) {
    return `${this.client.defaults.baseURL}/${path}`;
  }
}