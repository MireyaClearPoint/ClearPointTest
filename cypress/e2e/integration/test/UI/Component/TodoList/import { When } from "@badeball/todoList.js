
import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given('I browse to account login page', () => {
    cy.visit("https://www.sanrio.com/collections/hello-kitty");
});
