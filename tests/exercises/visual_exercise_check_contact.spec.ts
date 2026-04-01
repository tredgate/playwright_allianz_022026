import { test, expect } from "@playwright/test";

test("Exercise: Basic Visual Check", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  await expect(page).toHaveScreenshot("exercise_simple.png");
});
