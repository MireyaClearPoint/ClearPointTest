import TodoListAPIBase from "../../../../support/api/todoListAPIBase";
import { faker } from "@faker-js/faker";

// para el post
// expect(response.body).length.to.be.greaterThan(1);
//  expect(response.body[0]).to.have.property('description', 'Water')

const apiTodoList = "http://localhost:3002/api/todoItems/";

const TodoChore = "Feed my cat";
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
    
    cy.log(Cypress.env("TodoAmount"))



  });

  context("GET /todoItems", function () {
    it("verifies that the API returns the expected response", () => {
      // Post jsonBody to the app first so to have something in there to start with.
      TodoListAPIBase.post(apiTodoList, jsonBody);
      //intercept because I will need the ID to delete afterwards to cleanup to re-run without issues later on.
      cy.intercept("GET", "/api/todoItems").as("newIdCreate");
      cy.visit("http://localhost:3000");
      //  cy.reload()
      cy.wait("@newIdCreate").then((intercept) => {
        const { response } = intercept;
        //Cypress.env("apiIdToDelete", response.body[0].id);

        Cypress.env("apiIdToDelete", response.body[response.body.length - 1].id);

       
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

  });// end of GET

      context("POST /api/todoItems", function () {
      
      it("creates a new todo item",() => {
        //call different members of my fake family...
        const todo = `Call ${faker.name.firstName()}`;
  
        cy.request("POST", apiTodoList, {
          description: todo,
        }).then((response) => {
          expect(response.status).to.eq(201);
          // expect(response.body.user).to.contain({ firstName });
        });


      });

    });



  
}); // end of describe block






   // it("error when invalid field sent", function () {
      //   cy.request({
      //     method: "POST",
      //     url: `${apiUsers}`,
      //     failOnStatusCode: false,
      //     body: {
      //       notAUserField: "not a user field",
      //     },
      //   }).then((response) => {
      //     expect(response.status).to.eq(422);
      //     expect(response.body.errors.length).to.eq(1);
      //   });
      // });
