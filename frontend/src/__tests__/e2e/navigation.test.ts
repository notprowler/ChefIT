import { test, expect } from '@playwright/test';

test.describe('Navigation and Recipe Loading', () => {
  test('should navigate from homepage to recipes page and load recipes', async ({
    page,
  }) => {
    // Start by visiting the homepage
    await page.goto('/');

    // Verify we're on the homepage
    await expect(page.getByText('Chef it home')).toBeVisible();

    // Find and click the Recipes link in the main content (not in the navbar)
    // Using a more specific selector to target the link in the list item
    const recipesLink = page.locator('li a').filter({ hasText: 'Recipes' });
    await expect(recipesLink).toBeVisible();

    // Set up a response listener before clicking the link
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/recipes') && response.status() === 200
    );

    // Click the link to navigate to the recipes page
    await recipesLink.click();

    // Wait for the URL to change
    await expect(page).toHaveURL('/recipes');

    // Wait for the API response
    const response = await responsePromise;

    // Verify the response is JSON and contains recipes
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('recipes');
    expect(Array.isArray(responseBody.recipes)).toBeTruthy();

    // Wait for the recipe grid to be visible
    const recipeGrid = page.getByTestId('recipe-grid');
    await expect(recipeGrid).toBeVisible();

    // Verify that at least one recipe is rendered
    const recipeCards = page.locator('[data-testid="recipe-card"]');
    const count = await recipeCards.count();
    expect(count).toBeGreaterThan(0);
  });
});
