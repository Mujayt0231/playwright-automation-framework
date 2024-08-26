import { test } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage";

test("should display the join us banner on home page", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.verifyJoinUsBanner();
  await page.close();
});
