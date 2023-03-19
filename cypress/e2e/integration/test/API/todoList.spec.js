import TodoListAPIBase from "../../../../support/api/todoListAPIBase";

// para el post
// expect(response.body).length.to.be.greaterThan(1);
//  expect(response.body[0]).to.have.property('description', 'Water')

const apiTodoList = "http://localhost:3002/api/todoItems/";

const TodoChore = "Feed my cat"
describe("API test", () => {
  let jsonBody = {
    description: TodoChore,
  };

  // if removed this after() block test would failed the second time it runs
  //because duplicate records are not allow in the Todo List
  after(() => {
    let jsonBody2 = {
      id: Cypress.env("apiIdToDelete"),
      description: TodoChore,
      isCompleted: true,
    };
    TodoListAPIBase.put(apiTodoList + Cypress.env("apiIdToDelete"), jsonBody2);
  });

  context("GET /todoItems", function () {
    it("verifies that the API returns the expected response", () => {
      // Post jsonBody to the app first so to have something in there to start with.
      TodoListAPIBase.post(apiTodoList, jsonBody);
      //intercept because I will need the ID to delete afterwards to cleanup to re-run without issues later on.
      cy.intercept("GET", "/api/todoItems").as("newIdCreate");

      cy.visit("http://localhost:3000");
      cy.wait("@newIdCreate").then((intercept) => {
        const { response } = intercept;
        Cypress.env("apiIdToDelete", response.body[0].id);
      });

      cy.request("GET", apiTodoList).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        expect(response.body[0]).to.have.property("id").and.to.be.a("string");
        expect(response.body[0])
          .to.have.property("description")
          .and.to.be.a("string");
        expect(response.body[0])
          .to.have.property("isCompleted")
          .and.to.be.a("boolean");
      });
    });


  });



  
}); // end of describe block


