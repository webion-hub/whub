import { ContactInformation } from "./ContactInformation";

export interface Customer {
  readonly id: number;
  readonly name: string;
  readonly surname: string;
  readonly contactInformation?: ContactInformation;
}