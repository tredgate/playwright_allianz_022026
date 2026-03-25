import { test, expect } from "@playwright/test";

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
