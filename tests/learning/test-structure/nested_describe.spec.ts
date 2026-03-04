// tests/learning/test-structure/nested_describe.spec.ts
import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login_page.ts";

test.describe("Testování vnořených describe - Pmtool", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("První describe - pmtool assert page header", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.pageHeaderHasText("Login");
  });

  test.describe("Vnořený describe, pmtool Dashboard", () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      // ? Již není potřebujeme loginPage.openPmtool(), protože v předchozím beforeEach jsem již pmtool otevřeli
      await loginPage.login("pw_academy", "Playwright321!");
    });

    test("Vnořený describe - pmtool dashboard", async ({ page }) => {
      await expect(page.locator("#welcome-page-header")).toBeVisible();
    });
  });
});
