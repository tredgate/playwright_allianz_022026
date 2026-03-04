// tests/learning/test-structure/test_structure.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login_page.ts";

test.describe("Test Suite (describe)", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("Pmtool Login", async () => {
    await loginPage
      .fillUsername("pw_academy")
      .then((login) => login.fillPassword("Playwright321!"))
      .then((login) => login.clickLogin());
  });

  test("Failed Login", async () => {
    await loginPage
      .fillUsername("pw_academy")
      .then((login) => login.fillPassword("Playwrifbcfbgcgcgght321!"))
      .then((login) => login.clickLogin());
  });
});
