import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page.ts";

test("Exercise: Lost Password E2E", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.clickLostPassword())
    .then((lostPassword) => lostPassword.fillUsername("lost_password_user"))
    .then((lostPassword) => lostPassword.fillEmail("lost_password@tredgate.cz"))
    .then((lostPassword) => lostPassword.clickSend());
});

test("Exercise: Lost Password click back button", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.clickLostPassword())
    .then((lostPassword) => lostPassword.clickBack());
});
