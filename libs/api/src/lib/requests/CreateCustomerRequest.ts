import { OnBadRequest } from "../handlers";
import ContactInformation from "../model/contact-information";

export interface CreateCustomerRequest extends OnBadRequest {
  readonly name: string;
  readonly surname: string;
  readonly contactInformation: ContactInformation;
}