import { CreateCustomerRequest } from "../requests/CreateCustomerRequest";
import { CustomerEndpoint } from "./CustomerEndpoint";
import { Customer } from "../model/Customer";
import { Endpoint } from "@whub/apis-core";

export class CustomersEndpoint extends Endpoint {
  get url() {
    return 'customers';
  }
  
  withId(id: number) {
    return new CustomerEndpoint(this.client, id);
  }

  getAll() {
    return this.client.get<Customer[]>('');
  }

  create(request: CreateCustomerRequest) {
    return this.client.post<Customer>('', request);
  }
}