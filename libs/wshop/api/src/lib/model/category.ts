import { Product } from "./Product";

export interface Category {
  readonly id: number;
  readonly name: string;
  readonly products: Product[];
}
