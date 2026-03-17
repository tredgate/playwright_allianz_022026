import { Locator, Page, expect, test } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";
import { UserApi } from "../api/user_api.ts";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";

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

    // ! Pro použití této metody musíme vždy zavolat open(), jinak se nám nepodaří správně uložit token do Session storage.
    await test.step("Login using API and open dashboard", async () => {
      // ? Request můžeme vytáhnout z page contextu, vhodnější je to v případě, že nemáme APIRequestContext k dispozici v danou chvíli. V našem případě ho využijeme, abychom nemuseli vyžadovat APIRequestContext v konstruktoru LoginPage nebo parametru této metody.
      const api = new UserApi(this.page.context().request);
      // * Zavoláme API pro získání tokenu
      const token = await api.loginAndGetToken(username, password);
      // * Vložíme token do Session storage
      await this.page.evaluate((token) => {
        sessionStorage.setItem("userToken", token);
      }, token);
      // * Otevřeme dashboard, kde bychom měli být přihlášeni díky tokenu v Session storage
      await this.page.goto(`${this.url}dashboard`);
    });

    await dashboardPage.waitUntilPageLoaded();
    return dashboardPage;
  }
}
