import { faker } from "@faker-js/faker";
import { api } from "../api"

describe('Product endpoint', () => {
  faker.seed(101010);

  const createNewProduct = () => {
    return api.products.create({
      name: faker.commerce.product(),
      code: faker.random.alphaNumeric(5),
    });
  }

  it('Should get a product', async () => {
    const created = await createNewProduct();

    const product = await api.products
      .withId(created.data.id)
      .load();

    expect(product).toMatchSnapshot();
  });

  it('Should delete a product', async () => {
    const created = await createNewProduct();

    const deleted = await api.products
      .withId(created.data.id)
      .delete();

    expect(deleted).toMatchSnapshot();
  });

  it('Should update a product', async () => {
    const created = await createNewProduct();

    const updated = await api.products
      .withId(created.data.id)
      .update({
        name: 'Paolo',
        code: 'ABC123',
      });

    expect(updated).toMatchSnapshot();
  });
});