import { Endpoint } from "@wapi/core";
import { LoginRequest } from "../requests/LoginRequest";
import { AccountInfo } from "../model/AccountInfo";

export class AccountEndpoint extends Endpoint {
  get url(): string {
    return 'account';
  }


  info() {
    return this.client.get<AccountInfo>(this.at('info'));
  }

  isLoggedIn() {
    return this.client.get<boolean>(this.at('is_logged_in'));
  }

  login(request: LoginRequest) {
    return this.client.post(this.at('login'), request);
  }

  logout() {
    return this.client.post(this.at('logout'));
  }
}