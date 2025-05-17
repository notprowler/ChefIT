/// <reference types="cypress" />

describe('Recipes Page', () => {
  it('should display exactly 20 recipes', () => {
    cy.visit('http://localhost:4173/recipes');
    cy.get('[data-cy=recipe-card]').should('have.length', 20);
  });
});