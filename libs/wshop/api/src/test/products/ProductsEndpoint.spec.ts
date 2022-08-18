import { faker } from "@faker-js/faker";
import { api } from "../api";
import { fakeCreateProductRequest } from "../fakers/product";

describe('Products endpoint', () => {
  faker.seed(101010);

  it('Should create a product', async () => {
    const response = await api.products.create({
      name: faker.commerce.product(),
      code: faker.random.alphaNumeric(5),
    });

    expect(response).toMatchSnapshot();
  });

  it('Should get many products', async () => {
    const products = fakeCreateProductRequest(5);

    for (const p of products)
      await api.products.create(p)

    const allProducts = await api.products.list();

    expect(allProducts).toMatchSnapshot();
  });
});