import { Endpoint } from "@whub/apis/core";
import { AxiosInstance } from "axios";
import { UpdateCustomerRequest } from "../requests/UpdateCustomerRequest";
import { ContactInformation } from "../model/ContactInformation";
import { Customer } from "../model/Customer";

export class CustomerEndpoint extends Endpoint {
  constructor (
    client: AxiosInstance,
    private readonly id: number,
  ) {
    super(client);
  }


  get url() {
    return `customers/${this.id}`;
  }


  load() {
    return this.client.get<Customer>(this.url);
  }

  update(request: UpdateCustomerRequest) {
    return this.client.put<void>(this.url, request);
  }

  updateContactInformation(contactInfo: ContactInformation) {
    return this.client.put<void>(this.url + 'contactinfo', contactInfo);
  }

  delete() {
    return this.client.delete<void>(this.url);
  }
}
