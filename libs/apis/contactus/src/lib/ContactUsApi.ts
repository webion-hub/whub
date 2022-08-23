import { ApiBase } from "@whub/apis/core";
import { ContactUsEndpoint } from "./endpoints/ContactUsEndpoint";
import { CustomersEndpoint } from "./endpoints/CustomersEndpoint";

export class ContactUsApi extends ApiBase {
  get contactUs() {
    return new ContactUsEndpoint(this.client);
  }

  get customers() {
    return new CustomersEndpoint(this.client);
  }
}
