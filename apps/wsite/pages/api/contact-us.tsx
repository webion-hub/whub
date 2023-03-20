import axios from "axios";
import { JWT } from 'google-auth-library';

interface EmailAddress {
  readonly address: string,
  readonly name: string
}
interface MailRequest {
  readonly from: EmailAddress,
  readonly to: EmailAddress[],
  readonly cc: EmailAddress[],
  readonly bcc: EmailAddress[]
}

interface EmailCustomer {
  readonly email: string,
  readonly name: string,
}

interface SendEmailRequest {
  readonly mailRequest: MailRequest,
  readonly apiKey: string,
  readonly message: string,
  readonly customer: EmailCustomer,
  readonly bodyTemplate: string,
  readonly subjectTemplate: string
}

export default async function handler(req: any, res: any) {
  const {
    name,
    email,
    msg,
  } = req.body

  const body: SendEmailRequest = {
    apiKey: process.env.API_KEY ?? '',
    bodyTemplate: process.env.BODY_TEMPLATE ?? '',
    subjectTemplate: process.env.SUBJECT_TEMPLATE ?? '',
    customer: {
      email: email,
      name: name
    },
    message: msg,
    mailRequest: {
      from: {
        address: email,
        name: process.env.NAME ?? ''
      },
      to: [{
        address: process.env.ADDRESS ?? '',
        name: name,
      }],
      cc: [{
        address: 'matteo.budriesi@webion.it',
        name: 'matteo',
      }],
      bcc: []
    }
  }

  try {
    const contactUsApi = await getContactUsApi();
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

async function getContactUsApi() {
  const jwt = new JWT({
    email: process.env.JWT_EMAIL,
    key: process.env.JWT_KEY
  })

  const token = await jwt.fetchIdToken(process.env.TARGET_AUDIENCE ?? '')
  return axios.create({
      baseURL: process.env.CONTACT_US_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
}