import { PdfHandler } from "@wapi/pdf";
import { ContactUsHandler } from "@wapi/contactus";
import { JWT } from "google-auth-library";

const contactUsHandler = new ContactUsHandler({
  JWT: JWT,
  address: process.env.ADDRESS ?? '',
  apiKey: process.env.API_KEY ?? '',
  bodyTemplate: process.env.BODY_TEMPLATE ?? '',
  subjectTemplate: process.env.SUBJECT_TEMPLATE ?? '',
  baseUrl: process.env.CONTACT_US_BASE_URL ?? '',
  jwtEmail: process.env.JWT_EMAIL ?? '',
  jwtKey: process.env.JWT_KEY ?? '',
  name: process.env.NAME ?? '',
  targetAudience: process.env.TARGET_AUDIENCE ?? '',
})

const pdfHandler = new PdfHandler({
  JWT: JWT,
  baseUrl: process.env.PDF_BASE_URL ?? '',
  jwtEmail: process.env.JWT_EMAIL ?? '',
  jwtKey: process.env.JWT_KEY ?? '',
  targetAudience: process.env.TARGET_AUDIENCE ?? '',
})

export default async function handler(req: any, res: any) {
  //const pdf = await pdfHandler.getPdf("<html><head><title>titolone</title></head><body><h1> ciaone </h1><p>roba</p></body></html>")

  await contactUsHandler.getHandler(res, {
    ...req.body,
    attachments: [{
      filename: 'Preventivo App.pdf',
      //content: pdf.data
    }]
  })
}