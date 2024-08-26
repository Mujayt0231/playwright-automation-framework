import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByPlaceholder("Password").press("Enter");
  }

  async verifyInvalidLoginError() {
    await expect(
      this.page.locator("#claimVerificationServerError")
    ).toContainText("Invalid username or password.");
  }

  async verifyDashboardVisible() {
    await expect(
      this.page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible({ timeout: 8000 });
  }
}
