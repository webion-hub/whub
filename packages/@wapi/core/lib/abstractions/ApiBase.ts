import axios, { AxiosInstance } from "axios";
import { AxiosRequestConfig } from "axios";
import * as qs from 'qs'

export abstract class ApiBase {
  protected readonly client: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.client = axios.create({
      ...config,
      //validateStatus: () => true,
      paramsSerializer: {
        serialize: params => {
          return qs.stringify(params)
        }
      }
    });
  }
}