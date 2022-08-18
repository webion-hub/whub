import { faker } from "@faker-js/faker";
import { UpdateProductRequest } from "../../lib/requests/update-product-request";

export const fakeCreateProductRequest = (n: number): UpdateProductRequest[] => {
  return Array
    .from(Array(n))
    .map(() => ({
      name: faker.company.bs(),
      code: faker.random.alphaNumeric(5),
    }));
}
