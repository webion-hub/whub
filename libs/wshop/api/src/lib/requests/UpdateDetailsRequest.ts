import { ProductDetail } from "../model/ProductDetail";

export interface UpdateDetailsRequest {
  readonly details: ProductDetail[];
}