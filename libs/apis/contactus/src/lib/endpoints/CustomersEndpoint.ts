import axios from "axios";
import { config } from "../config";
import CustomerEndpoint from "./CustomerEndpoint";
import Customer from "../model/customer";
import { CreateCustomerRequest } from "../requests/CreateCustomerRequest";

export default class CustomersEndpoint {
  private static readonly client = axios.create({
    baseURL: `${config.baseUrl}/customers`,
    withCredentials: true,
  })

  static withId(id: number) {
    return new CustomerEndpoint(id);
  }

  static getAll() {
    return this.client.get<Customer[]>('');
  }

  static create(request: CreateCustomerRequest) {
    return this.client.post<Customer>('', request);
  }
}