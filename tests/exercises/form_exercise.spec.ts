import { test } from "@playwright/test";

test("Exercise: Forms", async ({ page }) => {
  const firstName = "Petr";
  const lastName = "Test";
  const email = "petr@example.org";
  const comment = "Bla bla";
  const contactDate = "2026-03-10";
  const role = "instructor";

  await page.goto("https://tredgate.com/webtrain/contact.html");
  await page.locator("#full-name").fill(firstName + " " + lastName);
  await page.locator("#email").fill(email);
  await page.locator("#contact-date").fill(contactDate);
  await page.locator("#role").selectOption(role);
  await page.locator("#comments").fill(comment);
  await page.locator("#newsletter").check();
  await page.locator('[data-testid="button-submit"]').click();
});
