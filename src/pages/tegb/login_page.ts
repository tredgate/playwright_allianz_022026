// src/pages/tegb/login_page.ts
import { Locator, Page, expect, test } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";
import { UserApi } from "../../api/tegb/user_api.ts";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com";

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.submitButton = page.locator('button[data-testid="submit-button"]');
  }

  async open() {
    await this.page.goto(this.url);
    return this;
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin() {
    await this.submitButton.click();
    return new DashboardPage(this.page);
  }

  async login(username: string, password: string) {
    const dashboardPage = new DashboardPage(this.page);

    await test.step("Login to application", async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.clickLogin();
      await dashboardPage.waitUntilPageLoaded();
    });

    return dashboardPage;
  }

  async waitUntilPageLoaded() {
    await test.step("Wait until Login page is Loaded", async () => {
      await expect(
        this.usernameInput,
        "Wait until Username Input is Visible",
      ).toBeVisible();
      await expect(
        this.passwordInput,
        "Wait until Password Input is Visible",
      ).toBeVisible();
      await expect(
        this.submitButton,
        "Wait until Submit Button is Visible",
      ).toBeVisible();
    });

    return this;
  }

  async loginUsingApi(username: string, password: string) {
    const dashboardPage = new DashboardPage(this.page);

    await test.step("Login using API and Open Dashboard", async () => {
      const request = this.page.context().request;
      const api = new UserApi(request);
      const token = await api.loginAndGetToken(username, password);
      await this.page.evaluate((givenToken) => {
        sessionStorage.setItem("userToken", givenToken);
      }, token);
      await this.page.goto(this.url + "/dashboard");
      await dashboardPage.waitUntilPageLoaded();
    });

    return dashboardPage;
  }
}
