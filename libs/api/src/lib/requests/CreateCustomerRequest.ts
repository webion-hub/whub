import ContactInformation from "../model/contact-information";

export interface CreateCustomerRequest {
  readonly name: string;
  readonly surname: string;
  readonly contactInformation: ContactInformation;
}