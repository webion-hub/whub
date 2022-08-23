import { ProductDetail } from "../model/product-detail";

export interface UpdateDetailsRequest {
  readonly details: ProductDetail[];
}