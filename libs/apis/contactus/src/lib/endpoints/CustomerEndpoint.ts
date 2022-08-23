import axios from "axios";
import { config } from "../config";
import ContactInformation from "../model/contact-information";
import Customer from "../model/customer";
import { UpdateCustomerRequest } from "../requests/UpdateCustomerRequest";

export default class CustomerEndpoint {
  private readonly client = axios.create({
    baseURL: `${config.baseUrl}/customers/${this.id}`,
    withCredentials: true,
  });

  constructor (
    private readonly id: number
  ) {}


  load() {
    return this.client.get<Customer>('');
  }

  update(request: UpdateCustomerRequest) {
    return this.client.put<void>('', request);
  }

  updateContactInformation(contactInfo: ContactInformation) {
    return this.client.put<void>('contactinfo', contactInfo);
  }

  delete() {
    return this.client.delete<void>('');
  }
}
