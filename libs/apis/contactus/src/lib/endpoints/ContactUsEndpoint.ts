import { ContactUsRequest } from "../requests/ContactUsRequest";
import { Endpoint } from "@whub/apis/core";

export class ContactUsEndpoint extends Endpoint {
  get url() {
    return '';
  }

  process(request: ContactUsRequest) {
    return this.client.post<void>('', request);
  }
}