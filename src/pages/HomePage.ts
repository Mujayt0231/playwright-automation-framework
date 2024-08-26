import { Page, expect } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("/");
  }

  async verifyJoinUsBanner() {
    await expect(this.page.getByText("Join Us Today")).toBeVisible();
  }

  async clickSignIn() {
    await this.page.getByRole("link", { name: "Sign In" }).click();
  }
}
