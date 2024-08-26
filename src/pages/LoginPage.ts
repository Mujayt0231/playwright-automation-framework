import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly invalidLoginError: Locator;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.invalidLoginError = page.locator("#claimVerificationServerError");
    this.dashboardHeading = page.getByRole("heading", { name: "Dashboard" });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.passwordInput.press("Enter");
  }

  async verifyInvalidLoginError() {
    await expect(this.invalidLoginError).toContainText(
      "Invalid username or password."
    );
  }

  async verifyDashboardVisible() {
    await expect(this.dashboardHeading).toBeVisible({ timeout: 15000 });
  }
}
