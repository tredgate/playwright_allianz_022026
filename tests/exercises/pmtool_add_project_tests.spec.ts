import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page.ts";

test("Exercise: Asserts", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage
    .open()
    .then((login) => login.login("pw_academy", "Playwright321!"));

  await page.locator("#Projects").click();
  const projectsTable = page.locator(".table-scrollable table");
  await expect(
    projectsTable,
    "Wait until table with projects is loaded",
  ).toBeVisible();
  await page.locator('[test_id="Add Project"]').click();

  const nameInput = page.locator('div[data-testid="Name"] input');
  const saveButton = page.locator("button[type='submit']");
  await expect(nameInput, "Name Input is Visible").toBeVisible();
  await expect(saveButton, "Save button has text").toHaveText("Save");
});
