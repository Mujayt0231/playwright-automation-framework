import { test as base, TestInfo } from "@playwright/test";

const errorCategories = {
  "Infrastructure problems": [
    "ConnectionError",
    "TimeoutError",
    "NetworkError",
    "Timed out",
  ],
  "Outdated tests": ["ElementNotFound", "SelectorNotFound"],
  "Product defects": ["AssertionError", "ValidationError"],
  "Test defects": ["TypeError", "ReferenceError"],
};

// Create a custom test object with error handling
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    // Set up error handling for the page
    page.on("pageerror", (error) => handleError(error, testInfo));

    // Use the page in the test
    await use(page);
  },
});

// Error handling function
function handleError(error: Error, testInfo: TestInfo) {
  const errorMessage = error.message || error.toString();
  let category = "Uncategorized";

  // Determine the category based on the error message
  for (const [cat, patterns] of Object.entries(errorCategories)) {
    if (patterns.some((pattern) => errorMessage.includes(pattern))) {
      category = cat;
      break;
    }
  }

  // Add the category as an Allure label using the new API
  testInfo.annotations.push({ type: "allure", description: category });

  // Log the error and category for debugging
  console.error(`Error in test "${testInfo.title}": ${errorMessage}`);
  console.log(`Categorized as: ${category}`);
}

// Extend the test object with a custom error wrapper
export function withErrorHandling(testFn: Function) {
  return async ({ page }, testInfo) => {
    try {
      await testFn({ page }, testInfo);
    } catch (error) {
      handleError(error, testInfo);
      throw error; // Re-throw the error to fail the test
    }
  };
}
