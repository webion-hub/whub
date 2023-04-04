import { Endpoint } from "@wapi/core";
import { AxiosResponse } from 'axios'
import { Attachment } from "../handler/EmailRequest";

export interface EmailRequest<T> {
  readonly name: string,
  readonly email: string,
  readonly msg: string,
  readonly attachments?: Attachment[],
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