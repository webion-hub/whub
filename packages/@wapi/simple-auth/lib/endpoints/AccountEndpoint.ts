import { Endpoint } from "@wapi/core";
import { LoginRequest } from "../requests/LoginRequest";
import { AccountInfo } from "../model/AccountInfo";
import { AxiosResponse } from 'axios'

export class AccountEndpoint extends Endpoint {
  get url(): string {
    return 'account';
  }


  info(): Promise<AxiosResponse<AccountInfo>> {
    return this.client.get<AccountInfo>(this.at('info'));
  }

  isLoggedIn(): Promise<AxiosResponse<boolean>> {
    return this.client.get<boolean>(this.at('is_logged_in'));
  }

  login(request: LoginRequest): Promise<AxiosResponse> {
    return this.client.post(this.at('login'), request);
  }

  logout(): Promise<AxiosResponse> {
    return this.client.post(this.at('logout'));
  }
}