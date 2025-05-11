/// <reference types="cypress" />

const mockRecipe = {
  title: "Mock Spaghetti",
  vegetarian: true,
  vegan: false,
  glutenFree: true,
  readyInMinutes: 30,
  servings: 2,
  spoonacularScore: 80,
  aggregateLikes: 25,
  image: "https://via.placeholder.com/600x400",
  summary: "<p>This is a <strong>mock</strong> summary</p>",
  instructions: "Boil water. Cook pasta. Serve hot.",
  extendedIngredients: [
    { name: "Pasta", amount: 200, unit: "g" },
    { name: "Salt", amount: 1, unit: "tsp" },
  ],
};

describe("Individual Recipe Page", () => {
  it("displays title, tags, and image correctly", () => {
    cy.visit("/recipes/1", {
      onBeforeLoad(win) {
        win.__TEST_RECIPE__ = mockRecipe;
      },
    });

    cy.get('[data-testid="recipe-title"]').should("exist").and("not.be.empty");
    cy.get('[data-testid="recipe-tags"]').find("span").should("have.length.greaterThan", 0);
    cy.get('[data-testid="recipe-image"]').should("be.visible").and(($img) => {
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
    });
  });
});
