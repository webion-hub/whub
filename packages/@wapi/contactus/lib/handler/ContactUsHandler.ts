import axios from "axios"
import { EmailRequest } from "../endpoints/ContactUsEndpoint"
import { EmailCustomer, SendEmailRequest } from "./EmailRequest"

interface ContactUsHandlerConfig {
  readonly JWT: any,
  readonly jwtEmail: string,
  readonly jwtKey: string,
  readonly targetAudience: string,
  readonly contactUsBaseUrl: string,
  readonly apiKey: string,
  readonly bodyTemplate: string,
  readonly subjectTemplate: string,
  readonly name: string,
  readonly address: string,
}

export class ContactUsHandler {
  constructor(private config: ContactUsHandlerConfig) {}

  sendEmail = async <T = {}>(res: any, reqBody: EmailRequest<T>) => {
    const body = this.getEmailBody(reqBody)

    try {
      const contactUsApi = await this.getContactUsApi();
      const response = await contactUsApi.post('', body);
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
    } as EmailCustomer<T>

    return {
      apiKey: this.config.apiKey,
      bodyTemplate: this.config.bodyTemplate,
      subjectTemplate: this.config.subjectTemplate,
      customer: customer,
      message: reqBody.msg,
      mailRequest: {
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

  private getContactUsApi = async () => {
    const jwt = new this.config.JWT({
      email: this.config.jwtEmail,
      key: this.config.jwtKey
    })
  
    const token = await jwt.fetchIdToken(this.config.targetAudience ?? '')
    return axios.create({
        baseURL: this.config.contactUsBaseUrl,
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
  }
}