import { faker } from "@faker-js/faker";
import { api } from "../api"
import { fakeUpdateProductRequest } from "../fakers/FakeProduct";

const createProduct = async () => {
  const created = await api.products.create({
    name: faker.commerce.product(),
    code: faker.random.alphaNumeric(5),
  });

  return api.products.withId(created.data.id);
}


describe('Product endpoint', () => {
  faker.seed(101010);

  it('Should get a product', async () => {
    const product = await createProduct();
    const loaded = await product.load();
    
    expect(loaded).toMatchSnapshot();
  });

  it('Should update a product', async () => {
    const product = await createProduct();
    const updated = await product.update(
      fakeUpdateProductRequest()
    );

    expect(updated).toMatchSnapshot();
  });

  it('Should delete a product', async () => {
    const product = await createProduct();
    const deleted = await product.delete();

    expect(deleted).toMatchSnapshot();
  });
});