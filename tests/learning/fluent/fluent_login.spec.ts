// tests/learning/fluent/fluent_login.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login_page.ts";

test("Login, logout using Fluent API", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage
    .open()
    .then((login) => login.fillUsername("pw_academy"))
    .then((login) => login.fillPassword("Playwright321!"))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.clickProfile())
    .then((dashboard) => dashboard.clickLogout());
});
