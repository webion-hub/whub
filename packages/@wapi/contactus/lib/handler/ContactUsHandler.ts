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

    try {
      const contactUsApi = await this.getContactUsApi();
      const pdf = await contactUsApi.post(
        'https://europe-west1-contact-us-377410.cloudfunctions.net/pdf-function', 
        JSON.stringify(`<div>ciao</div>`)
      )

      console.log(pdf.data)
      const body = this.getEmailBody(reqBody, pdf.data)
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

  private getEmailBody = <T = {}>(reqBody: EmailRequest<T>, pdf: any): SendEmailRequest<T> => {
    const customer = {
      email: reqBody.email,
      name: reqBody.name,
      ...reqBody.data
    } as EmailCustomer<T>
    function strEncodeUTF16(str: string) {
      var buf = new ArrayBuffer(str.length*2);
      var bufView = new Uint16Array(buf);
      for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return bufView;
    }
    let utf8Encode = new TextEncoder();

    const arr = JSON.stringify([...utf8Encode.encode(pdf) as any]);//JSON.stringify(strEncodeUTF16(pdf));
    console.log(arr)
    return {
      apiKey: this.config.apiKey,
      bodyTemplate: this.config.bodyTemplate,
      subjectTemplate: this.config.subjectTemplate,
      customer: customer,
      message: reqBody.msg,
      mailRequest: {
        attachments: [{
          filename: 'test.pdf',
          content: arr,
        }],
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