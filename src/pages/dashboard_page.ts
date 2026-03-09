import { expect, Locator, Page, test } from "@playwright/test";
import { LoginPage } from "./login_page.ts";
import { ProjectsPage } from "./projects_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;
  readonly alertIcon: Locator;
  readonly appNameAnchor: Locator;
  readonly projectsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.alertIcon = page.locator("#user_notifications_report");
    this.appNameAnchor = page.locator(".navbar-brand");
    this.projectsButton = page.locator("#Projects a");
  }

  async clickProfile() {
    await expect(this.alertIcon).toBeVisible(); // ? Počká na zobrazení alert ikony - kvůli plnému načtení stránky
    await this.profileButton.click();
    return this;
  }

  async clickLogout() {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async logout() {
    await this.clickProfile();
    return await this.clickLogout();
  }

  async assertDashboard(appName: string) {
    await test.step("Dashboard Asserts", async () => {
      await expect(
        this.profileButton,
        "Profile Button is Visible",
      ).toBeVisible();
      await expect(this.appNameAnchor, "App Name has Text").toHaveText(appName);
    });
  }

  async clickProjects() {
    await this.projectsButton.click();
    return new ProjectsPage(this.page);
  }
}
