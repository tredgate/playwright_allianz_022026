// tests/learning/test-structure/test_steps.spec.ts
import { expect, test } from "@playwright/test";

test("Steps in Test", async ({ page }) => {
  await test.step("Open Pmtool", async () => {
    await page.goto("https://tredgate.com/pmtool");
  });

  await test.step("Login", async () => {
    await page.locator("#username").fill("pw_academy");
    await page.locator("#password").fill("Playwright321!");
    await page.locator(".btn").click();
    await expect(page.locator("#user_notifications_report")).toBeVisible();
  });

  await test.step("Logout", async () => {
    await page.locator("#user_dropdown").click();
    await page.locator("#logout").click();
  });
});
