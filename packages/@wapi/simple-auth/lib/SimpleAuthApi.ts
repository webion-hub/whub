import { ApiBase } from "@wapi/core";
import { AccountEndpoint } from "./endpoints/AccountEndpoint";

export class SimpleAuthApi extends ApiBase {
  get account() {
    return new AccountEndpoint(this.client);
  }
}