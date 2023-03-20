import { Endpoint } from "@wapi/core";
import { AxiosResponse } from 'axios'

export interface EmailRequest<T> {
  readonly name: string,
  readonly email: string,
  readonly msg: string,
  readonly data?: T
}
export class ContactUsEndpoint extends Endpoint {
  get url() {
    return '';
  }

  process<T = {}>(request: EmailRequest<T>): Promise<AxiosResponse<void>> {
    return this.client.post<void>('', request);
  }
}