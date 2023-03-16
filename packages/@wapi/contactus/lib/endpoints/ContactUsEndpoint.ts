import { Endpoint } from "@wapi/core";
import { AxiosResponse } from 'axios'

export class ContactUsEndpoint extends Endpoint {
  get url() {
    return '';
  }

  process<T>(request: T): Promise<AxiosResponse<void>> {
    return this.client.post<void>('', request);
  }
}