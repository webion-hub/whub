import { Attachment } from "./Attachment";
import { Category } from "./Category";
import { Embed } from "./Embed";
import { Image } from "./Image";
import { Producer } from "./Producer";
import { ProductDetail } from "./ProductDetail";
import { Tag } from "./Tag";

export interface Product {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly details: ProductDetail[];
  readonly price?: number;
  readonly category?: Category;
  readonly producer?: Producer;
  readonly rating?: number;
  readonly code: string;
  readonly images: Image[];
  readonly attachments: Attachment[];
  readonly tags: Tag[];
  readonly relatedProducts: Product[];
  readonly mainVariant?: Product;
  readonly variants: Product[];
  readonly embeds: Embed[];
}
