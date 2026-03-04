// tests/learning/tags/tags_tests.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login_page.ts";

test("Tag Test", { tag: "@mujTag" }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
});

test("Without Tag", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
});

test.describe("Tagged Test Suite", { tag: "@mujTag" }, () => {
  test("Tagged Describe Test 1", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("Tagged Describe Test 2", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });
});

test.describe("Without Tag Describe", () => {
  test("Not Tagged Describe", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });
});
