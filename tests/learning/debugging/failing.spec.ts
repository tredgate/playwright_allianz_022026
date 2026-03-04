// tests/learning/debugging/failing.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login_page.ts";

test("Debugging Failures", async ({ page }) => {
  const password = getPassword();
  const loginPage = new LoginPage(page);

  await loginPage
    .open()
    .then((login) => login.fillUsername("pw_academy"))
    .then((login) => login.fillPassword(password))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.clickProfile())
    .then((dashboard) => dashboard.clickLogout());
});

function getPassword() {
  const randomNumber = Math.random();
  // Na základě náhodného čísla buď vrátíme heslo nebo špatné heslo, což způsobí selhání testu
  if (randomNumber > 0.5) {
    return "Playwright321!";
  } else {
    return ""; // Toto způsobí chybu, protože očekáváme string
  }
}
