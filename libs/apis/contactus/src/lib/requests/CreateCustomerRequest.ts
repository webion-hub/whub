import { ContactInformation } from "../model/ContactInformation";

export interface CreateCustomerRequest {
  readonly name: string;
  readonly surname: string;
  readonly contactInformation: ContactInformation;
}