export default interface ContactUsRequest {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly message: string;
  readonly phoneNumber?: string;
}