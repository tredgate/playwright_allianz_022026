import { expect, test } from "@playwright/test";

const mockedProfile = {
  userId: 36487,
  name: "Tester",
  surname: "Testovič",
  age: 30,
  email: "tester@playwright.com",
  phone: "+420777111222",
};

test("Mocking API response TEG#B accounts", async ({ page }) => {
  const username = "allianz_user";
  const password = "AllianzPlaywright";

  // * Mockujeme API s /tegb/profile v path
  await page.route(/\/tegb\/profile/, async (interceptedApi) => {
    // ? Alternativa k regexu: "*/**/tegb/profile"
    console.log("Mockujeme API profile");
    await interceptedApi.fulfill({ json: mockedProfile });
  });

  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/");
  await page.locator('[data-testid="username-input"]').fill(username);
  await page.locator('[data-testid="password-input"]').fill(password);
  const loginResponsePromise = page.waitForResponse(/\/tegb\/accounts/);
  await page.locator('[data-testid="submit-button"]').click();
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
