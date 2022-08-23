import ContactUsRequest from "../requests/ContactUsRequest";
import axios from 'axios';
import { config } from "../config";

export default class ContactUsEndpoint {
  private static readonly client = axios.create({
    baseURL: `${config.baseUrl}/contactus`,
  });

  static process(request: ContactUsRequest) {
    return this.client.post<void>('', request);
  }
}