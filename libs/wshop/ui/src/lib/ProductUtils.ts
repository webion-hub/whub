import { Product, WShopApi } from "@whub/wshop-api";
import _ from "lodash";
import { PreviewProduct } from "../components/ProductHandler";

export class ProductUtils {
  static async prepareAllForUI(shopApi: WShopApi, product: Product[]): Promise<PreviewProduct[]> {
    return await Promise.all(
      product.map(p => ProductUtils.prepareForUI(shopApi, p))
    )
}

  static async prepareForUI(shopApi: WShopApi, product: Product): Promise<PreviewProduct> {
      const files = await this.getAttachmentsFiles(shopApi, product)
      const images = await this.getImagesFiles(product)

      return {
        ...product,
        attachments: files,
        images: images
      }
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

  static getImagesFiles(product: Product) {
    const images = this.getImages(product)

    const tasks = images
      .map(async i => ({
        id: i.id,
        file: await this.getBase64FromUrl(i.url) as string
      }))

    return Promise.all(tasks)
  }

  static getAttachmentsFiles(shopApi: WShopApi, product: Product) {
    const attachments = this.getAttachments(shopApi, product)

    const tasks = attachments.map(async a => {
      const res = await fetch(a.url)
      const buf = await res.arrayBuffer()
      return {
        id: a.id,
        file: new File([buf], a.name)
      }
    })

    return Promise.all(tasks)
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
