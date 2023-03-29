import { ApiHandler } from "@wapi/core"

export class PdfHandler extends ApiHandler {

  getPdf = async (html: string) => {
    const pdfApi = await this.getApi()
    const response = await pdfApi.post('', JSON.stringify(html))
    return response
  } 

  getHandler = async (res: any, html: string) => {
    try {
      const response = await this.getPdf(html)

      res
        .status(response.status)
        .json({ pdf: response.data })
        .end()
    }
    catch {
      res
        .status(500)
        .end()
    }
  }
}