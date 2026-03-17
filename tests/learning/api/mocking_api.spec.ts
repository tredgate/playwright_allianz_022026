import { expect, test } from "@playwright/test";

// ? Vytvoření JSON, který bude použitý pro MOCK (nahradíme response.body profile endpointu)
const mockedProfile = {
  userId: 36487,
  name: "Tester",
  surname: "Testerson",
  age: 30,
  email: "tester@example.com",
  phone: "123-456-7890",
};

test("TEG#B Accounts mock", async ({ page }) => {
  const username = "allianz_user";
  const password = "AllianzPlaywright";

  // * Nastavení odchycení API a MOCKu
  await page.route("*/**/tegb/profile", async (interceptedApi) => {
    console.log("Mockujeme API accounts");
    await interceptedApi.fulfill({ json: mockedProfile });
  });

  // * Navigace a přihlášení, které nám umožní získat data z profilu, které jsme si předtím namockovali
  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/");
  await page.locator('[data-testid="username-input"]').fill(username);
  await page.locator('[data-testid="password-input"]').fill(password);
  const loginResponsePromise = page.waitForResponse(/\/tegb\/login/); // ? Využití Regex pro zachycení URL, která obsahuje /auth/login
  await page.locator('button[data-testid="submit-button"]').click();
  await loginResponsePromise;

  // * Po přihlášení otestujeme údaje z profilu
  const nameDiv = page.locator('[data-testid="name"]');
  const surnameDiv = page.locator('[data-testid="surname"]');
  const ageDiv = page.locator('[data-testid="age"]');
  const emailDiv = page.locator('[data-testid="email"]');
  const phoneDiv = page.locator('[data-testid="phone"]');
  // ? Prvek obsahuje jak label, tak i hodnotu, proto očekáváme text ve formátu "Jméno: Tester"
  await expect(nameDiv, "Assert profile name have correct text").toHaveText(
    "Jméno: " + mockedProfile.name,
  );
  await expect(
    surnameDiv,
    "Assert profile surname have correct text",
  ).toHaveText("Příjmení: " + mockedProfile.surname);
  await expect(ageDiv, "Assert profile age have correct text").toHaveText(
    "Věk: " + mockedProfile.age,
  );
  await expect(emailDiv, "Assert profile email have correct text").toHaveText(
    "Email: " + mockedProfile.email,
  );
  await expect(phoneDiv, "Assert profile phone have correct text").toHaveText(
    "Telefon: " + mockedProfile.phone,
  );
});
