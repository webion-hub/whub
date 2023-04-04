import { ApiHandler, ApiHandlerConfig } from "@wapi/core";
import axios from "axios"
import { EmailRequest } from "../endpoints/ContactUsEndpoint"
import { Attachment, EmailCustomer, SendEmailRequest } from "./EmailRequest"

interface ContactUsHandlerConfig extends ApiHandlerConfig {
  readonly apiKey: string,
  readonly bodyTemplate: string,
  readonly subjectTemplate: string,
  readonly name: string,
  readonly address: string,
}

export class ContactUsHandler extends ApiHandler {
  constructor(private config: ContactUsHandlerConfig) {
    super(config)
  }

  sendEmail = async <T = {}>(reqBody: EmailRequest<T>) => {
    const body = this.getEmailBody(reqBody)

    const contactUsApi = await this.getApi();
    const response = await contactUsApi.post('', body);

    return response
  }

  getHandler = async <T = {}>(res: any, reqBody: EmailRequest<T>) => {
    try {
      const response = await this.sendEmail(reqBody);

      res
        .status(response.status)
        .end()
    }
    catch {
      res
        .status(500)
        .end()
    }
  }

  private getEmailBody = <T = {}>(reqBody: EmailRequest<T>): SendEmailRequest<T> => {
    const customer = {
      email: reqBody.email,
      name: reqBody.name,
      ...reqBody.data
    } as EmailCustomer<T>

    const preparedAttachments = reqBody
      .attachments
      ?.map(a => ({ ...a, content: JSON.stringify(a.content) }))
      ?? []

    return {
      apiKey: this.config.apiKey,
      bodyTemplate: this.config.bodyTemplate,
      subjectTemplate: this.config.subjectTemplate,
      customer: customer,
      message: reqBody.msg,
      mailRequest: {
        attachments: preparedAttachments,
        from: {
          address: reqBody.email,
          name: this.config.name
        },
        to: [{
          address: this.config.address,
          name: this.config.name,
        }],
        cc: [{
          address: 'matteo.budriesi@webion.it',
          name: 'matteo',
        }],
        bcc: []
      }
    }
  }
}