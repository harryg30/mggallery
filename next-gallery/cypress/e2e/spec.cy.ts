/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("spec.cy.js", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/art");
  });

  // it("should have header", () => {
  //   cy.visit("/");
  //   cy.should("contain", ".header");
  // });

  it("should visit post's page", () => {
    cy.get('[href="art/post/656e33379758cbb42a545e82"]').click();
    cy.url().should("include", "post/656e33379758cbb42a545e82");
  });

  it("should go back to /art", () => {
    cy.get('[href="art/post/656e33379758cbb42a545e82"]').click();
    cy.get(".back-button").click();
    cy.url().should("include", "/art");
    cy.url().should("not.include", "post");
  });
});
