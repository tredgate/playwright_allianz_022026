import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Register and Login via API to app", async ({ page, request }) => {
  // * Příprava testovacích dat (pomocí faker)
  const username = faker.internet.username();
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

  // * Navigace na frontend a vložení tokenu do Session storage (klíč: userToken)
  await page.goto(frontendUrl);
  await page.evaluate((token) => {
    sessionStorage.setItem("userToken", token);
  }, token);

  // * Použití Local storage - někdy aplikace může používat local storage místo session storage
  /* 
    await page.evaluate((token) => {
       localStorage.setItem(
         "userToken",
         sessionStorage.getItem("userToken") || token,
       );
     }, token);
    */
  // * Použití cookie - někdy aplikace může používat cookie místo session/local storage
  /* await page.context().addCookies([
          {
         name: "userToken",
         value: token,
         path: "/",
         domain: "tegb-frontend-88542200c6db.herokuapp.com", // ? doména stránky
       },
     ]);
    */
  // * Otevření dashboardu - měli bychom být přihlášeni, protože máme token v session storage
  await page.goto(`${frontendUrl}/dashboard`);
  // * Počkáme na načtení odhlašovacího tlačítka
  const logoutButton = page.locator('[data-testid="logout-button"]');
  await expect(
    logoutButton,
    "Wait until logout button is visible",
  ).toBeVisible();
});