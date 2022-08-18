import { Image } from "./image";
import { Product } from "./product";

export interface Producer {
  readonly id: number;
  readonly name: string;
  readonly place?: string;
  readonly description?: string;
  readonly profilePicture?: Image;
  readonly products: Product[];
}