import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;
  readonly alertIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.alertIcon = page.locator("#user_notifications_report");
  }

  async clickProfile() {
    await expect(this.alertIcon).toBeVisible(); // ? Počká na zobrazení alert ikony - kvůli plnému načtení stránky
    await this.profileButton.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }

  async logout() {
    await this.clickProfile();
    await this.clickLogout();
  }
}
