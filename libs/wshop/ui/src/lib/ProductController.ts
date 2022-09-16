import { handleResponse } from "@whub/apis-core";
import { Attachment, Image, Product, WShopApi } from "@whub/wshop-api";
import { AxiosResponse } from "axios";
import { ProductUtils } from "./ProductUtils";

interface Actions {
  readonly onCodeConflict?: () => void,
  readonly onComplete?: () => void,
  readonly onSuccess?: () => void,
  readonly onError?: () => void,
  readonly onAttachmentsError?: () => void,
  readonly onImagesError?: () => void,
  readonly onRelatedProductsError?: () => void,
  readonly onDetailsrror?: () => void,
}

export class ProductController {
  constructor(
    private readonly shopApi: WShopApi,
    private readonly product: Product,
    private readonly actions: Actions,
  ) {}

  getEndpoint(id: number) { return this.shopApi.products.withId(id) }

  async create() {
    const res = await this.shopApi
      .products
      .create(this.getBaseProduct(this.product))

    this.handleResponse(res)
  }

  async update(productId: number) {
    const res = await this.shopApi.products
      .withId(productId)
      .update(this.getBaseProduct(this.product))

    this.handleResponse(res)
  }

  async cleanProductFiles(id: number) {
    const endpoint = this.getEndpoint(id)

    const cleanImageTasks = this.product.images?.map(i =>
      endpoint.images.withId(i.id).delete()
    )

    const cleanAttachmentsTasks = this.product.attachments?.map(i =>
      endpoint.attachments.withId(i.id).delete()
    )

    return Promise.all([
      ...cleanImageTasks ?? [],
      ...cleanAttachmentsTasks ?? []
    ])
  }

  private handleResponse(res: AxiosResponse<Product, any>) {
    handleResponse(res, {
      201: async () => await this.addProductInformations(res.data.id),
      200: async () => await this.addProductInformations(res.data.id),
      409: () => this.actions.onCodeConflict?.()
    })
  }

  private uploadData(id: number, images: Image[], attachments: File[]) {
    return Promise.all([
      this.uploadFiles(id, attachments).catch(this.actions.onAttachmentsError),
      this.uploadImages(id, images).catch(this.actions.onImagesError),
      this.uploadReleated(id).catch(this.actions.onRelatedProductsError),
      this.uploadDetails(id).catch(this.actions.onDetailsrror)
    ])
  }

  private uploadDetails(id: number) {
    const details = this.product.details

    if(details.length === 0)
      return new Promise<void>(res => res())

    return this.getEndpoint(id)
      .details
      .update({
        details: details
      })
  }

  private uploadReleated(id: number) {
    const relatedProducts = this.product.relatedProducts

    if(relatedProducts.length === 0)
      return new Promise<void>(res => res())

    return this.getEndpoint(id)
      .updateRelatedProducts({
        productIds: relatedProducts.map(p => p.id)
      })
  }

  private uploadFile(file: File, id: number) {
    return this.getEndpoint(id)
      .attachments
      .upload(file)
  }

  private async uploadFiles(id: number, files: File[]) {
    const tasks = files.map(file => this.uploadFile(file, id))
    return Promise.all(tasks)
  }

  private uploadImage(image: Image, id: number) {
    return this.getEndpoint(id)
      .images
      .upload({
        image: image.url,
        index: image.index,
      })
  }

  private async uploadImages(id: number, images: Image[]) {
    const tasks = images.map((image) => this.uploadImage(image, id))
    return Promise.all(tasks)
  }

  private async addProductInformations(id: number) {
    try {
      const attachments =
        await ProductUtils.getAllAttachementAsFile(this.product.attachments)

      const images =
        await ProductUtils.getAllImagesAsData64(this.product.images)

      await this.cleanProductFiles(id)
      await this.uploadData(id, images, attachments)

      this.actions.onSuccess?.()
    }
    finally { this.actions.onComplete?.() }
  }

  private getBaseProduct(product: Product) {
    return {
      name: product.name,
      price: product.price,
      description: product.description,
      code: product.code,
      categoryId: product.category?.id
    }
  }
}
