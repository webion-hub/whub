import { OnBadRequest } from "../handlers";

export default interface ContactUsRequest extends OnBadRequest {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly message: string;
  readonly phoneNumber?: string;
}