import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import TodoPage from "../../../../pageObjects/TodoPage";

Given("the Todo List page is displayed", () => {
  cy.visit("http://localhost:3000");
  cy.get(TodoPage.heading).should("contain.text", "Todo List App");
  cy.url().should("eq", "http://localhost:3000/");
});

When("the customer types {string}", (item) => {
  TodoPage.InputTodoItem(item);
});

Then("the customer adds the item", () => {
  TodoPage.AddItemAction();
});

Then("a {string} is added to the list", (item) => {
  TodoPage.verifyItemOnList(item);
});

Then("the Todo List currently has an {string} added", (item) => {
  TodoPage.AddItemPostRequest(item)



    cy.reload()
    cy.reload()
  });

