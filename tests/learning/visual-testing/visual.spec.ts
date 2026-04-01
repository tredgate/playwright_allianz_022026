import { test, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../../../src/pages/login_page.ts";

test("Simple Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await expect(page).toHaveScreenshot("simple_test.png");
});

test.skip("Failing Visual Assert", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
  await expect(page).toHaveScreenshot("failing.png");
});

test("Full Page Visual Assert", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await expect(page).toHaveScreenshot("full_page.png", {
    fullPage: true,
  });
});

test("maxDiff changes", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await expect(page).toHaveScreenshot("max_ratio.png", {
    maxDiffPixelRatio: 0.01, // ? Citlivost (maximální rozdíl mezi obrázky): 1 %
  });
  await expect(page).toHaveScreenshot("max_pixels.png", {
    maxDiffPixels: 50,
  });
});

test("Masking dynamic elements", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await expect(page).toHaveScreenshot("masked_element.png", {
    fullPage: true,
    mask: [page.locator("#hover-box"), page.locator("#drag1")],
  });
});

test("Failing masking dynamic sized elements", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
  await expect(page).toHaveScreenshot("failed_masking.png", {
    fullPage: true,
    mask: [page.locator('//div[@data-testid="dynamic-size-box"][1]')],
  });
});

test("Hiding Elements with CSS", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
  await expect(page).toHaveScreenshot("hidden_css.png", {
    fullPage: true,
    stylePath: path.resolve(__dirname, "../../../assets/visual_tests.css"),
  });
});

test("Image Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/index.html");
  await expect(page.locator("#playwright-logo")).toHaveScreenshot(
    "image_test.png",
  );
});

test("Module Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  await expect(page.locator("#practiceForm")).toHaveScreenshot(
    "module_test.png",
  );
});

test("Input Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  const phoneInput = page.locator("#phone");
  await phoneInput.fill("123456789");
  await expect(phoneInput).toHaveScreenshot("input_test.png");
});

test("Visual Check in Page Object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open().then((login) => login.assertVisualLoginForm());
});
