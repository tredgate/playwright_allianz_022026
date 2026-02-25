// src/pages/login_page.ts

import { Locator, Page } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";
import { LostPasswordPage } from "./lost_password_page.ts";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://tredgate.com/pmtool/";
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly lostPasswordButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator('[type="submit"]');
    this.lostPasswordButton = page.locator("#forget_password");
  }

  // Při vytváření metod doporučím přístup začít s atomickými (malými) metodami s jedním krokem a pak vytvářet sdružující metody
  // Například: fillUsername - jeden krok, login - sdružení více kroků
  // Atomické metody používáme, když danou funkcionalitu testujeme a sdružující metody například pro preconditions jiných testů

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
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  // Sloučená (group) metoda -> slučuje jednotlivé kroky pro testy, které jen proletí přihlášením a nepotřebují ho testovat
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    return await this.clickLogin();
    // Je možné i:
    // return new DashboardPage(this.page);
  }

  async clickLostPassword() {
    await this.lostPasswordButton.click();
    return new LostPasswordPage(this.page);
  }
}
