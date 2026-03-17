// tests/learning/api/api_reusing_data.spec.ts
import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Reusing Data Between API Calls", async ({ request }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const username =
    faker.internet.username() + "_" + faker.number.int({ max: 100_000 });

  const registerResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        email,
        password,
      },
    },
  );
  const registerBody = await registerResponse.json();
  // ? Expect tu máme kvůli kontrole, že userId existuje v registerBody. Pokud by neexistoval, do userId by se nám mohl uložit "undefined" -> to by mohlo způsobit obtížný debugging v rámci pádů.
  expect(registerBody.userId, "registerBody.userId is defined").toBeDefined();

  const userId = registerBody.userId;

  // * Provolání dalšího requestu (vytažení informací o nově vytvořeném uživateli)
  const userResponse = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop",
    {
      params: {
        userId,
      },
    },
  );
  // * Otestování User response
  const userResponseBody = await userResponse.json();
  expect(userResponseBody.userId, "userResponseBody.userId have a text").toBe(
    userId,
  );
  expect(userResponseBody.email, "userResponseBody.email have a email").toBe(
    email,
  );
  expect(
    userResponseBody.username,
    "userResponseBody.email have a username",
  ).toBe(username);
  expect(
    typeof userResponseBody.createdAt,
    "userResponseBody.createdAt is a string",
  ).toBe("string");
  expect(
    userResponseBody.updatedAt,
    "userResponseBody.updatedAt is defined",
  ).toBeDefined();
  expect(userResponseBody.active, "userResponseBody.active have value").toBe(1);
});
