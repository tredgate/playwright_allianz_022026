// tests/learning/atomic-tests/atomic_tests_create_project.spec.ts
import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login_page.ts";
import { CreateNewProjectModal } from "../../../src/pages/projects/create_new_project_modal.ts";

test.describe("Atomic Tests: Create Project Modal", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = "pw_academy";
    const password = "Playwright321!";

    await loginPage
      .open()
      .then((login) => login.login(username, password))
      .then((dashboard) => dashboard.clickProjects())
      .then((projects) => projects.clickAddProject());
  });

  test("Modal Structure Tests", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);

    await test.step("Title Header Tests", async () => {
      await expect(addProjectModal.titleHeader).toBeVisible();
      await expect.soft(addProjectModal.titleHeader).toHaveText("Project Info");
    });
    // ! TODO: zbytek assertů, ukázka soft assertu bez awaitu
  });
});
