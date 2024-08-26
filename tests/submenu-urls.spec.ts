import { test, expect } from "@playwright/test";
import { testData } from "../src/data/testdata";

test.describe.configure({ mode: "parallel" });

test.describe("Navigability of URLs", () => {
  testData.urls.forEach((url) => {
    test(`should navigate to ${url} successfully`, async ({ page }) => {
      const response = await page.goto(`${url}`);
      const statusCode = response?.status();
      expect(statusCode).toBeGreaterThanOrEqual(200);
      expect(statusCode).toBeLessThan(300);
    });
  });
});
