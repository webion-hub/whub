
export interface EmailAddress {
  readonly address: string,
  readonly name: string
}

export interface Attachment {
  readonly filename: string,
  readonly content: string
}

export interface MailRequest {
  readonly from: EmailAddress,
  readonly attachments: Attachment[],
  readonly to: EmailAddress[],
  readonly cc: EmailAddress[],
  readonly bcc: EmailAddress[]
}

export type EmailCustomer<T> = {
  readonly email: string,
  readonly name: string,
} & T

export interface SendEmailRequest<T = {}> {
  readonly mailRequest: MailRequest,
  readonly apiKey: string,
  readonly message: string,
  readonly customer: EmailCustomer<T>,
  readonly bodyTemplate: string,
  readonly subjectTemplate: string
}