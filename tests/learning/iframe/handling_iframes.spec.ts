// tests/learning/iframe/handling_iframes.spec.ts

import { test } from "@playwright/test";

test("Work with iframe", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  const frame = page.frameLocator('[data-testid="test-automation-iframe"]');
  await frame.locator("#name").fill("Pracujeme s iframe");
});
