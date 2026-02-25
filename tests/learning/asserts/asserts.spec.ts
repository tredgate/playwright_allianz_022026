// tests/learning/asserts/asserts.spec.ts

import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login_page.ts";
import { DashboardPage } from "../../../src/pages/dashboard_page.ts";

test.describe("Asserts - Testing in Playwright", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage
      .open()
      .then((login) => login.fillUsername("pw_academy"))
      .then((login) => login.fillPassword("Playwright321!"))
      .then((login) => login.clickLogin());
  });

  test("toContainText Assert", async ({ page }) => {
    // ? Základní expect s lokátorem
    await expect(page.locator("#welcome-page-header")).toContainText(
      "Vítej v testovací aplikaci",
    );

    // ? Expect s custom message a lokátorem v const
    const welcomePageHeader = page.locator("#welcome-page-header");
    await expect(
      welcomePageHeader,
      "Welcome Page Header Contain Text",
    ).toContainText("Vítej v testovací aplikaci");
  });

  test("toHaveText Assert", async ({ page }) => {
    const welcomePageHeader = page.locator("#welcome-page-header");
    await expect(welcomePageHeader, "Welcome Page Header Have Text").toHaveText(
      "Vítej v testovací aplikaci Tredgate Project",
    );
  });

  test("toBeVisible Assert", async ({ page }) => {
    const logoImage = page.locator(".logo img");
    await expect(logoImage, "Logo is Visible").toBeVisible();
  });

  test("toHaveValue Assert", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage
      .clickProfile()
      .then((dashboard) => dashboard.clickLogout());

    const usernameInput = page.locator("#username");
    const usernameValue = "PetrTest";
    await usernameInput.fill(usernameValue);
    await expect(usernameInput, "Username Input have Value").toHaveValue(
      usernameValue,
    );
  });
});
