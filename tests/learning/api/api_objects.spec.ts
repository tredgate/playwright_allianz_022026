// tests/learning/api/api_objects.spec.ts

import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { UserApi } from "../../../src/api/tegb/user_api.ts";

test("Register and Login with API Objects", async ({ request }) => {
  const username =
    faker.internet.username() + faker.number.int({ max: 1_000_000 });
  const password = faker.internet.password();
  const email = faker.internet.email();
  const api = new UserApi(request);

  const registerResponse = await api.registerUser(username, password, email);
  const loginResponse = await api.loginUser(username, password);

  // * Testy registrace a přihlášení
  // * I testy mohou být přesunuty do API objektů
  expect(registerResponse.status()).toBe(201);
  expect(loginResponse.status()).toBe(201);

  const registerResponseBody = await registerResponse.json();
  const registerUserId = registerResponseBody.userId;
  expect(registerUserId).toBeDefined();

  const loginResponseBody = await loginResponse.json();
  const accessToken = loginResponseBody.access_token;
  expect(accessToken).toBeDefined();
  expect(typeof accessToken).toBe("string");
});
