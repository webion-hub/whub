import { Attachment, Image, Product, WShopApi } from "@whub/wshop-api";
import _ from "lodash";

export class ProductUtils {
  static prepareImages(images?: Image[]) {
    return _(images ?? [])
      .sortBy(i => i.index)
      .map(i => i.url)
      .value()
  }

  static getImages(product: Product) {
    return _(product.images)
      .sortBy(i => i.index)
      .value()
  }

  static getAttachments(shopApi: WShopApi, product: Product) {
    const shopProduct = shopApi.products.withId(product.id);
    return product.attachments
      .map(a => ({
        id: a.id,
        url: shopProduct.attachments.withId(a.id).fullUrl,
        name: a.fileName
      }))
  }

  static getAttachment(a: Attachment) {
    return a.file
      ? URL.createObjectURL(a.file)
      : a.url
  }

  static async getAllImagesAsData64(images: Image[]) {
    const temp = [...images]
    const notData64 = _.remove(temp, a => !a.url.startsWith('data:'))

    const tasks = notData64
      .map(async (i) => ({
        id: i.id,
        index: i.index,
        url: await this.getBase64FromUrl(i.url) as string
      }))

    const images1 = await Promise.all(tasks)
    return [...temp, ...images1]
  }

  static getAttachmentsFiles(attachments: Attachment[]) {
    const tasks = attachments.map(a => {
      return this.getAttachmentFile(a)
    })

    return Promise.all(tasks)
  }

  static async getAttachmentFile(attachment: Attachment) {
      const res = await fetch(attachment.url)
      const buf = await res.arrayBuffer()
      return new File([buf], attachment.fileName)
  }

  static async getAllAttachementAsFile(attachments: Attachment[]) {
    const temp = [...attachments]
    const notFiles = _.remove(temp, a => !a.file)

    const files1 = await this.getAttachmentsFiles(notFiles)
    const files2 = temp.map(f => f.file as File)

    return [...files1, ...files2]
  }

  private static async getBase64FromUrl(url: string) {
    const data = await fetch(url);
    const blob = await data.blob();

    return new Promise<string | ArrayBuffer | null>((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      }
    });
  }
}
