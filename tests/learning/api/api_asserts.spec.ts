import { expect, test } from "@playwright/test";

test("Assert Response 200 OK", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/123",
  );

  expect(response.status(), "Eshop User Response is 200").toBe(200);
  expect(response.statusText(), "Eshop User Response Status is 'OK'").toBe(
    "OK",
  );
});

test("Assert Response Header", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/123",
  );
  const headers = response.headers();
  const contentType = headers["content-type"];
  expect(contentType, "Header Content-Type have Value").toBe(
    "application/json; charset=utf-8",
  );
});

test("Response Body Assert", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train",
  );
  const responseBody = await response.json();
  console.log(responseBody); // * Jen pro ukázku, v reálném testu bychom nepoužili

  // * Kontroly (Asserty)
  // ? Existence klíče v responseBody
  expect.soft(responseBody.id, "responseBody.id is defined").toBeDefined();
  expect
    .soft(responseBody, "responseBody have property message")
    .toHaveProperty("message");

  // ? Kontrola datového typu
  expect
    .soft(typeof responseBody.id, "responseBody.id is a number")
    .toBe("number");

  // ? Kontrola správnosti dat
  expect
    .soft(responseBody.message, "responseBody.message have text")
    .toBe("TEG#B Training GET request successful");
  expect
    .soft(responseBody.message, "responseBody.message contain text")
    .toContain("TEG#B Training");
});
