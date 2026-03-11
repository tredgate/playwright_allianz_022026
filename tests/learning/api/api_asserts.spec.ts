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
