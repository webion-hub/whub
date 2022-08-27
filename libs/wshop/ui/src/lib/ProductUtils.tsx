import { Product, WShopApi } from "@whub/wshop-api";

export class ProductUtils {
  static getImages(shopApi: WShopApi, product: Product) {
    const shopProduct = shopApi.products.withId(product.id);
    return product.images.map(i => ({
      id: i.id,
      fullUrl: shopProduct.images.withId(i.id).fullUrl
    }))
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

  static getImagesFiles(shopApi: WShopApi, product: Product) {
    const images = this.getImages(shopApi, product)

    const tasks = images.map(async i => ({
      id: i.id,
      file: await this.getBase64FromUrl(i.fullUrl) as string
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
