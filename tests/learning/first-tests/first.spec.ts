// tests/learning/first-tests/first.spec.ts
import { test } from "@playwright/test";

test("First Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("pw_academy");
  await page.locator("#password").fill("Playwright321!");
  await page.locator(".btn").click();
});

test.skip("Failing test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#usernameeeee").fill("pw_academy");
});
