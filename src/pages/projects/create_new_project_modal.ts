import { expect, Locator, Page } from "@playwright/test";
import { ProjectTasksPage } from "./project_tasks_page.ts";
import { ProjectsPage } from "../projects_page.ts";

export class CreateNewProjectModal {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly saveButton: Locator;
  readonly titleHeader: Locator;
  readonly infoTab: Locator;
  readonly prioritySelect: Locator;
  readonly priorityLabel: Locator;
  readonly statusSelect: Locator;
  readonly statusLabel: Locator;
  readonly nameLabel: Locator;
  readonly nameValidationDiv: Locator;
  readonly startDateInput: Locator;
  readonly startDateLabel: Locator;
  readonly descriptionFrame: string;
  readonly descriptionLabel: Locator;
  readonly attachmentsButton: Locator;
  readonly attachmentsLabel: Locator;
  readonly closeButton: Locator;
  readonly alertMessageDiv: Locator;
  readonly deleteAttachmentButton: Locator;
  readonly firstAttachmentName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('[data-testid="Name"] input');
    this.saveButton = page.locator('[type="submit"]');
    this.titleHeader = page.locator("h4.modal-title");
    this.infoTab = page.locator('//ul[@id="form_tabs"]/li[1]');
    this.prioritySelect = page.locator('[data-testid="Priority"] select');
    this.priorityLabel = page.locator(
      '//div[@data-testid="Priority"]//ancestor::div[contains(@class, "form-group")]/label',
    );
    this.statusSelect = page.locator('//div[@data-testid="Status"]//select');
    this.statusLabel = page.locator(
      '//div[@data-testid="Status"]//ancestor::div[contains(@class, "form-group")]/label',
    );
    this.nameLabel = page.locator(
      '//div[@data-testid="Name"]//ancestor::div[contains(@class, "form-group")]/label',
    );
    this.nameValidationDiv = page.locator('[data-testid="Name"] label.error');
    this.startDateInput = page.locator(
      '//div[@data-testid="Start Date"]//input',
    );
    this.startDateLabel = page.locator(
      '//div[@data-testid="Start Date"]//ancestor::div[contains(@class, "form-group")]/label',
    );
    this.descriptionFrame = '//div[@data-testid="Description"]//iframe';
    this.descriptionLabel = page.locator(
      '//div[@data-testid="Description"]//ancestor::div[contains(@class, "form-group")]/label',
    );
    this.attachmentsButton = page.locator(
      '//div[@data-testid="Attachments"]//div[contains(@class, "btn-upload")]',
    );
    this.attachmentsLabel = page.locator(
      '//div[@data-testid="Attachments"]//ancestor::div[contains(@class, "form-group")]/label',
    );
    this.closeButton = page.locator(".btn-close");
    this.alertMessageDiv = page.locator("#form-error-container .alert");
    this.deleteAttachmentButton = page.locator(
      '//div[@data-testid="Attachments"]//label[contains(@class, "delete_attachments")]',
    );
    this.firstAttachmentName = page.locator(
      '//div[@data-testid="Attachments"]//div[contains(@class, "attachments-form-list")]//tr[1]/td[1]',
    );
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
    return this;
  }

  async clickSave() {
    await this.saveButton.click();
    return new ProjectTasksPage(this.page);
  }

  async clickClose(): Promise<ProjectsPage> {
    await this.closeButton.click();
    return new ProjectsPage(this.page);
  }

  async selectPriority(priorityValue: string) {
    await this.prioritySelect.selectOption(priorityValue);
    return this;
  }

  async selectStatus(statusValue: string): Promise<this> {
    await this.statusSelect.selectOption(statusValue);
    return this;
  }

  async fillStartDate(startDate: string): Promise<this> {
    await this.startDateInput.fill(startDate);
    return this;
  }

  async fillDescription(description: string): Promise<this> {
    const iframe = this.page.frameLocator(this.descriptionFrame);
    await iframe.locator("body").fill(description);
    return this;
  }

  async uploadFile(filePath: string): Promise<this> {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.attachmentsButton.click();
    const fileInput = await fileChooserPromise;
    await fileInput.setFiles(filePath);
    await expect(this.deleteAttachmentButton).toBeVisible();
    return this;
  }

  async triggerNameInputValidation(): Promise<this> {
    await this.nameInput.clear();
    await this.saveButton.click();
    return this;
  }

  async triggerAlarmMessage(): Promise<this> {
    await this.triggerNameInputValidation();
    return this;
  }
}
