import { Product } from "./product";

export interface Category {
  readonly id: number;
  readonly name: string;
  readonly products: Product[];
}