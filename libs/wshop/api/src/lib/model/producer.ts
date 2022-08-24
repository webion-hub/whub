import { Image } from "./Image";
import { Product } from "./Product";

export interface Producer {
  readonly id: number;
  readonly name: string;
  readonly place?: string;
  readonly description?: string;
  readonly profilePicture?: Image;
  readonly products: Product[];
}
