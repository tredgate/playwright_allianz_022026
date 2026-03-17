import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/teg-b/login_page.ts";

test("Using Page Objects with API", async ({ page }) => {
  const username = "allianz_user";
  const password = "AllianzPlaywright";
  const loginPage = new LoginPage(page);

  await loginPage
    .open()
    .then((login) => login.loginUsingApi(username, password))
    .then((dashboard) => dashboard.logout());
});
