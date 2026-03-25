// tests/learning/dictionary/dictionaries.spec.ts
import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login_page.ts";
import { pmtoolTexts } from "../../../src/dictionaries/dictionary.ts";

test("Using dictionaries to reuse texts", async ({ page }) => {
  const username = process.env.PMTOOL_USERNAME as string;
  const password = process.env.PMTOOL_PASSWORD as string;
  const loginPage = new LoginPage(page);

  await loginPage
    .open()
    .then((login) => login.pageHeaderHasText(pmtoolTexts.login.header))
    .then((login) => login.login(username, password));

  const welcomeHeader = page.locator("#welcome-page-header");
  await expect(welcomeHeader).toHaveText(pmtoolTexts.dashboard.welcomeTitle);
});
