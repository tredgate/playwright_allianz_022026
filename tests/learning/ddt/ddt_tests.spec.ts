// tests/learning/ddt/ddt_tests.spec.ts
import { test } from "@playwright/test";
import newProjectData from "../../../assets/ddt/new_project_data.json";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

test.describe("Data Driven Tests", () => {
  newProjectData.forEach((project, index) => {
    test(`${index + 1} DDT: Create Project ${project.description}`, async ({
      page,
    }) => {
      const projectName =
        project.name_prefix + faker.number.int({ max: 1_000_000 });
      const startDate = getStartDate(project.start_date, "YYYY-MM-DD");

      console.log(`Projekt: ${projectName}, Start Date: ${startDate}`);
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
