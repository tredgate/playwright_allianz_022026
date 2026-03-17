import { expect, test } from "@playwright/test";

test("Exercise: API Asserts", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4",
  );
  const responseBody = await response.json();

  expect(responseBody.userId, "responseBody.userId is defined").toBeDefined();
  expect(typeof responseBody.active, "responseBody.active is a number").toBe(
    "number",
  );
  expect(responseBody.username, "responseBody.username have a text").toBe(
    "petrfifka",
  );
});
