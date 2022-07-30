import ContactUsRequest from "../requests/ContactUsRequest";
import axios from 'axios';
import { config } from "../config";
import { handleErrors } from "../responses/response";

export default class ContactUsEndpoint {
  private static readonly client = axios.create({
    baseURL: `${config.baseUrl}/contactus`,
  });

  static process(request: ContactUsRequest) {
    return this.client.post<void>('', request).then(r => handleErrors(r, request));
  }
}