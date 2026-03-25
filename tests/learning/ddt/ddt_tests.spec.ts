import { test } from "@playwright/test";
import newProjectData from "../../../assets/ddt/new_project_data.json";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { LoginPage } from "../../../src/pages/login_page.ts";

test.describe("Data Driven Tests", () => {
  newProjectData.forEach((project, index) => {
    test(`${index + 1} DDT: Create Project ${project.description}`, async ({
      page,
    }) => {
      const projectName =
        project.name_prefix + faker.number.int({ max: 1_000_000 });
      const startDate = getStartDate(project.start_date, "YYYY-MM-DD");
      const startDateProjectInfo = getStartDate(
        project.start_date,
        "DD/MM/YYYY",
      );
      const username = "pw_academy";
      const password = "Playwright321!";
      const loginPage = new LoginPage(page);

      console.log(`Projekt: ${projectName}, Start Date: ${startDate}`);

      await loginPage
        .open()
        .then((login) => login.open())
        .then((login) => login.login(username, password))
        .then((dashboard) => dashboard.clickProjects())
        .then((projects) => projects.clickAddProject())
        .then((newProject) =>
          newProject.selectPriorityByLabel(project.priority),
        )
        .then((newProject) => newProject.selectStatus(project.status))
        .then((newProject) => newProject.fillName(projectName))
        .then((newProject) => newProject.fillStartDate(startDate))
        .then((newProject) => newProject.fillDescription(project.description))
        .then((newProject) => newProject.clickSave())
        .then((tasks) => tasks.clickProjectInfo())
        .then((projectInfo) => projectInfo.projectNameHaveText(projectName))
        .then((projectInfo) => projectInfo.priorityHaveText(project.priority))
        .then((projectInfo) => projectInfo.statusHaveText(project.status))
        .then((projectInfo) =>
          projectInfo.startDateHaveText(startDateProjectInfo),
        );
    });
  });
});

function getStartDate(startDate: string, format: string) {
  let formattedStartDate = "$INVALID_DATE";
  switch (startDate) {
    case "today":
      formattedStartDate = dayjs().format(format);
      break;
    case "tomorrow":
      formattedStartDate = dayjs().add(1, "day").format(format);
      break;
    case "yesterday":
      formattedStartDate = dayjs().subtract(1, "day").format(format);
      break;
    default:
      throw new Error("Nevalidní startDate");
  }
  return formattedStartDate;
}
