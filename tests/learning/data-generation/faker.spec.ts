// tests/learning/data-generation/faker.spec.ts
import { test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker"; // ? Česká lokalizace - nemusí umět vygenerovat všechno v češtině
// import { faker } from "@faker-js/faker"; // ? anglická verze faker - funguje vždy

test("Testing Data Generation with Faker", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.exampleEmail();
  const password = faker.internet.password({ length: 20 });
  const address = faker.location.streetAddress();

  console.log(`First name: ${firstName}`);
  console.log(`Last name: ${lastName}`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log(`Address: ${address}`);
});
