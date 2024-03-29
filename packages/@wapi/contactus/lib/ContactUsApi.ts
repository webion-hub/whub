import { ApiBase } from "@wapi/core";
import { ContactUsEndpoint } from "./endpoints/ContactUsEndpoint";

export class ContactUsApi extends ApiBase {
  get contactUs() {
    return new ContactUsEndpoint(this.client);
  }
}
