// tests/learning/atomic-tests/atomic_tests_create_project.spec.ts
import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login_page.ts";
import { CreateNewProjectModal } from "../../../src/pages/projects/create_new_project_modal.ts";
import path from "path";

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

    await test.step("Info Tab Tests", async () => {
      await expect.soft(addProjectModal.infoTab).toBeVisible();
      await expect.soft(addProjectModal.infoTab).toHaveText("Info");
    });

    await test.step("Priority Select Tests", async () => {
      await expect.soft(addProjectModal.prioritySelect).toBeVisible();
      await expect.soft(addProjectModal.priorityLabel).toBeVisible();
      await expect.soft(addProjectModal.priorityLabel).toHaveText("*Priority");
      await expect.soft(addProjectModal.prioritySelect).toHaveValue("34"); // ? Kontrola výchozí hodnoty selectu
      await addProjectModal.selectPriority("35");
      await expect.soft(addProjectModal.prioritySelect).toHaveValue("35");
      await addProjectModal.selectPriority("34");
      await expect.soft(addProjectModal.prioritySelect).toHaveValue("34");
    });

    await test.step("Status Select Tests", async () => {
      await expect.soft(addProjectModal.statusSelect).toBeVisible();
      await expect.soft(addProjectModal.statusLabel).toBeVisible();
      await expect.soft(addProjectModal.statusLabel).toHaveText("*Status");
      await addProjectModal.statusSelect.selectOption("38");
      await expect.soft(addProjectModal.statusSelect).toHaveValue("38");
      await addProjectModal.statusSelect.selectOption("37");
      await expect.soft(addProjectModal.statusSelect).toHaveValue("37");
      await addProjectModal.statusSelect.selectOption("39");
      await expect.soft(addProjectModal.statusSelect).toHaveValue("39");
      await addProjectModal.statusSelect.selectOption("40");
      await expect.soft(addProjectModal.statusSelect).toHaveValue("40");
      await addProjectModal.statusSelect.selectOption("41");
      await expect.soft(addProjectModal.statusSelect).toHaveValue("41");
    });

    await test.step("Name Input Tests", async () => {
      await expect.soft(addProjectModal.nameInput).toBeVisible();
      await expect.soft(addProjectModal.nameInput).toBeEnabled();
      await expect.soft(addProjectModal.nameLabel).toBeVisible();
      await expect.soft(addProjectModal.nameLabel).toHaveText("*Name");
    });

    await test.step("Start Date Input Tests", async () => {
      await expect.soft(addProjectModal.startDateInput).toBeVisible();
      await expect.soft(addProjectModal.startDateInput).toBeEnabled();
      await expect.soft(addProjectModal.startDateLabel).toBeVisible();
      await expect
        .soft(addProjectModal.startDateLabel)
        .toHaveText("Start Date");
    });

    await test.step("Buttons Structure Tests", async () => {
      await expect.soft(addProjectModal.attachmentsButton).toBeVisible();
      await expect
        .soft(addProjectModal.attachmentsButton)
        .toHaveText("Add Attachments");
      await expect.soft(addProjectModal.saveButton).toBeVisible();
      await expect.soft(addProjectModal.saveButton).toHaveText("Save");
      await expect.soft(addProjectModal.closeButton).toBeVisible();
      await expect.soft(addProjectModal.closeButton).toHaveText("Close");
    });
  });

  test("Name Input Validation Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    await addProjectModal.triggerNameInputValidation();
    await expect.soft(addProjectModal.nameValidationDiv).toBeVisible();
    await expect
      .soft(addProjectModal.nameValidationDiv)
      .toHaveText("This field is required!");
  });

  test("Alert Message Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    await addProjectModal.triggerAlarmMessage();
    await expect.soft(addProjectModal.alertMessageDiv).toBeVisible();
    await expect
      .soft(addProjectModal.alertMessageDiv)
      .toHaveText(
        "Some fields are required. They have been highlighted above.",
      );
  });

  test("Upload File Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    const fileName = "upload_file.txt";
    const filePath = path.resolve(__dirname, "../../../assets/" + fileName);
    await addProjectModal.uploadFile(filePath);
    await expect(addProjectModal.firstAttachmentName).toHaveText(fileName);
  });

  test("Click Back Button Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    await addProjectModal.clickClose();
    // TODO: Add Expect
  });

  test("Description iframe Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    const descriptionText = "Description Test";
    await addProjectModal.fillDescription(descriptionText);
    // ? Ideální je toto předat do Page Objectu:
    const frame = page.frameLocator(addProjectModal.descriptionFrame);
    await expect(frame.locator("body")).toHaveText(descriptionText);
  });
});
