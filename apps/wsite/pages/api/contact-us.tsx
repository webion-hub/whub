import axios from "axios";
import { JWT } from 'google-auth-library';

interface EmailAddress {
  readonly Address: string,
  readonly Name: string
}
interface MailRequest {
  readonly From: EmailAddress,
  readonly To: EmailAddress[],
  readonly Cc: EmailAddress[],
  readonly Bcc: EmailAddress[]
}

interface EmailCustomer {
  readonly Email: string,
  readonly Name: string,
}

interface SendEmailRequest {
  readonly MailRequest: MailRequest,
  readonly ApiKey: string,
  readonly Message: string,
  readonly Customer: EmailCustomer,
  readonly BodyTemplate: string,
  readonly SubjectTemplate: string
}

export default async function handler(req: any, res: any) {
  const {
    name,
    email,
    msg,
  } = req.body

  const body: SendEmailRequest = {
    ApiKey: process.env.API_KEY ?? '',
    BodyTemplate: process.env.BODY_TEMPLATE ?? '',
    SubjectTemplate: process.env.SUBJECT_TEMPLATE ?? '',
    Customer: {
      Email: email,
      Name: name
    },
    Message: msg,
    MailRequest: {
      From: {
        Address: email,
        Name: process.env.NAME ?? ''
      },
      To: [{
        Address: process.env.ADDRESS ?? '',
        Name: name,
      }],
      Cc: [{
        Address: 'matteo.budriesi@webion.it',
        Name: 'matteo',
      }],
      Bcc: []
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