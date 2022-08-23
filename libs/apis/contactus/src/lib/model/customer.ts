import ContactInformation from "./contact-information";

export default interface Customer {
  readonly id: number;
  readonly name: string;
  readonly surname: string;
  readonly contactInformation?: ContactInformation;
}