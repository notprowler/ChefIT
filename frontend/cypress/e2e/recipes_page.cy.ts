// This is the E2E test for Step 3 of the Session 6 assignment.

/// <reference types="cypress" />

describe("Recipes Page", () => {
  beforeEach(() => {
    // Intercept the GET request for recipes and return mock data
    cy.intercept("GET", "**/recipes*", {
      statusCode: 200,
      body: {
        recipes: [
          {
            id: 1,
            title: "Vegan Pasta",
            image: "https://spoonacular.com/recipeImages/vegan-pasta-1.jpg",
            readyInMinutes: 30,
            servings: 4,
            vegan: true,
            vegetarian: true,
            glutenFree: false,
            dairyFree: true,
          },
          {
            id: 2,
            title: "Chicken Curry",
            image: "https://spoonacular.com/recipeImages/chicken-curry-2.jpg",
            readyInMinutes: 45,
            servings: 6,
            vegan: false,
            vegetarian: false,
            glutenFree: true,
            dairyFree: false,
          },
        ],
      },
    });
  });

  const visitRecipesPage = () => {
    cy.visit("/recipes", {
      headers: {
        Accept: "text/html",
      },
      failOnStatusCode: false,
    });
  };

  it("loads and displays recipes", () => {
    visitRecipesPage();

    cy.contains("Vegan Pasta").should("exist");
    cy.contains("Chicken Curry").should("exist");
  });

  it("filters by Vegan", () => {
    visitRecipesPage();

    cy.contains("Show Filters").click();
    cy.get("label").contains("Vegan").click();

    cy.contains("Vegan Pasta").should("exist");
    cy.contains("Chicken Curry").should("not.exist");
  });

  it("clears filters", () => {
    visitRecipesPage();

    cy.contains("Show Filters").click();
    cy.get("label").contains("Vegan").click();
    cy.contains("Clear Filters").click();

    cy.contains("Vegan Pasta").should("exist");
    cy.contains("Chicken Curry").should("exist");
  });

  it("shows correct results count", () => {
    visitRecipesPage();

    cy.contains("Showing 2 of 2 recipes").should("exist");

    cy.contains("Show Filters").click();
    cy.get("label").contains("Vegan").click();

    cy.contains("Showing 1 of 2 recipes").should("exist");
  });
});