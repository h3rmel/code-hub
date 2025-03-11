import { SavePurchases } from "@/domain/use-cases";
import { faker } from "@faker-js/faker";

export function mockPurchases(): Array<SavePurchases.Params> {
  return [
    {
      id: faker.string.uuid(),
      product: faker.commerce.productName(),
      date: faker.date.recent(),
      value: faker.number.int({ min: 1, max: 5000 }),
    },
    {
      id: faker.string.uuid(),
      product: faker.commerce.productName(),
      date: faker.date.recent(),
      value: faker.number.int({ min: 1, max: 5000 }),
    },
  ];
}
