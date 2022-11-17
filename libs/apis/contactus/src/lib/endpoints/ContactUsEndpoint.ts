import { Endpoint } from "@whub/apis-core";

export class ContactUsEndpoint extends Endpoint {
  get url() {
    return '';
  }

  process<T>(request: T) {
    return this.client.post<void>('', request);
  }
}