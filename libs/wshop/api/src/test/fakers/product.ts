import { faker } from "@faker-js/faker";
import { UpdateProductRequest } from "../../lib/requests/update-product-request";

export const fakeUpdateProductRequest = () => ({
  name: faker.commerce.product(),
  code: faker.random.alphaNumeric(6),
});

export const fakeUpdateProductRequests = (n: number): UpdateProductRequest[] => {
  return Array
    .from(Array(n))
    .map(() => fakeUpdateProductRequest());
}