/// <reference types="cypress" />

describe("Signup Page", () => {
  it("should allow a new user to sign up", () => {
    cy.visit("http://localhost:4173/signup");

    cy.get("input#name").type("Test User");
    cy.get("input#email").type(`testuser_${Date.now()}@gmail.com`);
    cy.get("input#password").type("TestPassword123!");

    cy.get('button[type="submit"]').click();
    
    cy.on("window:alert", (txt) => {
      expect(txt.toLowerCase()).to.contain("signup successful");
    });
    
    cy.url({ timeout: 10000 }).should("include", "/login");
  });
});

describe("Login Page", () => {
  it("should allow an existing user to log in", () => {
    cy.visit("http://localhost:4173/login");

    cy.get("input#email").type("Arihanttiwari2005@gmail.com");
    cy.get("input#password").type("Testing123@");

    cy.get('button[type="submit"]').click();

    cy.contains(/welcome|dashboard|recipes|logout/i, { timeout: 10000 }).should(
      "exist"
    );
  });
});
