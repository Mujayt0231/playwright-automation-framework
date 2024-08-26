import { test, expect } from "@playwright/test";
import { testData } from "../src/data/testdata";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

test.describe("Login Suite", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.clickSignIn();
  });

  test("invalid credential for user login", async () => {
    await loginPage.login("test-automation@test.com", "Testing123.");
    await loginPage.verifyInvalidLoginError();
  });

  test("valid credential for user login", async () => {
    await loginPage.login(testData.username, testData.password);
    await loginPage.verifyDashboardVisible();
  });

  test("forget password page navigation", async ({ page }) => {
    await page.getByRole("link", { name: "Forgot password?" }).click();
    await expect(
      page.getByRole("link", { name: "Go back to sign in" })
    ).toBeVisible({ timeout: 5000 });
  });

  test("'already have an account' page navigation", async ({ page }) => {
    await page.getByLabel("CREATE AN ACCOUNT").click();
    await expect(page.getByText("Already have an account")).toBeVisible({
      timeout: 5000,
    });
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
