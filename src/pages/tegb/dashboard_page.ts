// src/pages/tegb/dashboard_page.ts
import { Locator, Page, expect, test } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator('[data-testid="logout-button"]');
  }

  async waitUntilPageLoaded() {
    await expect(
      this.logoutButton,
      "Wait until Logout Button is Visible",
    ).toBeVisible();
    return this;
  }

  async logout() {
    const loginPage = new LoginPage(this.page);

    await test.step("Logout", async () => {
      await this.logoutButton.click();
      await loginPage.waitUntilPageLoaded();
    });

    return loginPage;
  }
}
