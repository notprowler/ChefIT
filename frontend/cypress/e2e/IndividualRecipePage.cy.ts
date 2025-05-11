/// <reference types="cypress" />

describe('Individual Recipe Page', () => {
  it('displays title, tags, and image correctly', () => {
    cy.visit('/recipes/1'); // Adjust route if needed

    cy.get('[data-testid="recipe-title"]')
      .should('exist')
      .and('not.be.empty');

    cy.get('[data-testid="recipe-tags"]')
      .find('span')
      .should('have.length.greaterThan', 0);

    cy.get('[data-testid="recipe-image"]')
      .should('be.visible')
      .and(($img) => {
        expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
      });
  });
});
