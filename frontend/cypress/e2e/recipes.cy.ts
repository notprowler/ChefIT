/// <reference types="cypress" />

describe('Recipes Page', () => {
  it('should display exactly 20 recipes', () => {
    cy.intercept('GET', '**/recipes**').as('getRecipes');
    cy.visit('http://localhost:4173/recipes');
    cy.wait('@getRecipes'); 
    cy.get('[data-cy=recipe-card]').should('have.length', 20);
  });
});