import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page.ts";
import { faker } from "@faker-js/faker";

test("Exercise: Create Project", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const projectName = `petr_allianz_${faker.number.int({ max: 100_000 })}`;
  const username = "pw_academy";
  const password = "Playwright321!";

  await loginPage
    .open()
    .then((login) => login.login(username, password))
    .then((dashboard) => dashboard.clickProjects())
    .then((projects) => projects.clickAddProject())
    .then((newProject) => newProject.fillName(projectName))
    .then((newProject) => newProject.clickSave())
    .then((projectTasks) => projectTasks.clickProfile())
    .then((projectTasks) => projectTasks.clickLogout());
});
