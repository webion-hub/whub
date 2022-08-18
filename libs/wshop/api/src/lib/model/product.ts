import { Category } from "./category";
import { Image } from "./image";
import { Producer } from "./producer";
import { ProductDetail } from "./product-detail";
import { Tag } from "./tag";

export interface Product {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly details: ProductDetail[];
  readonly price?: number;
  readonly category?: Category;
  readonly producer?: Producer;
  readonly rating?: number;
  readonly code?: string;
  readonly images: Image[];
  readonly attachments: string[];
  readonly tags: Tag[];
  readonly relatedProducts: Product[];
  readonly mainVariant?: Product;
  readonly variants: Product[];
}