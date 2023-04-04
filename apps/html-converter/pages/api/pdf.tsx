import { PdfHandler } from "@wapi/pdf";
import { JWT } from "google-auth-library";
import { NextApiRequest, NextApiResponse } from "next";

const pdfHandler = new PdfHandler({
  JWT: JWT,
  baseUrl: process.env.PDF_BASE_URL ?? '',
  jwtEmail: process.env.JWT_EMAIL ?? '',
  jwtKey: process.env.JWT_KEY ?? '',
  targetAudience: process.env.TARGET_AUDIENCE ?? '',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await pdfHandler.getHandler(res, req.body.html)
  }
}