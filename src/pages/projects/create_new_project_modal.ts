import { Locator, Page } from "@playwright/test";
import { ProjectTasksPage } from "./project_tasks_page.ts";

export class CreateNewProjectModal {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('[data-testid="Name"] input');
    this.saveButton = page.locator('[type="submit"]');
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
    return this;
  }

  async clickSave() {
    await this.saveButton.click();
    return new ProjectTasksPage(this.page);
  }
}
