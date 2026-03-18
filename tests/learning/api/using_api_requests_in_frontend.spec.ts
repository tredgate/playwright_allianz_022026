import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Register and Login via API to app", async ({ page, request }) => {
  // * Příprava testovacích dat (pomocí faker)
  const username =
    faker.internet.username() + faker.number.int({ max: 1_000_000 });
  const password = faker.internet.password();
  const email = faker.internet.email();
  const backendUrl = "https://tegb-backend-877a0b063d29.herokuapp.com";
  const frontendUrl = "https://tegb-frontend-88542200c6db.herokuapp.com";

  // * Registrace uživatele pomocí API
  await request.post(`${backendUrl}/tegb/register`, {
    data: {
      username,
      password,
      email,
    },
  });

  // * Přihlášení uživatele pomocí API a uložení response do proměnné
  const loginResponse = await request.post(`${backendUrl}/tegb/login`, {
    data: {
      username,
      password,
    },
  });
  const loginResponseBody = await loginResponse.json();
  const token = loginResponseBody.access_token;

  // * Navigace na frontend a vložení tokenu do Session storage (klíč: userToken). Otevřít stránku potřebujeme, aby se použila session storage dané aplikace
  await page.goto(frontendUrl);
  await page.evaluate((givenToken) => {
    sessionStorage.setItem("userToken", givenToken);
  }, token);
  await page.goto(frontendUrl + "/dashboard");
  await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
});
