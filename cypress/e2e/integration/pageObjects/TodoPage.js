//Using the Page-object pattern for scalability
// The benefits are easy to maintain and refactor the page object and the test.

export default class TodoPage {
  static heading = ".alert-heading";
  static descriptionInput = "#formAddTodoItem";
  static addButton = ".hstack > .btn-primary";
  static url_todoList = "/api/todoItems";

  static addCleanUpCallBack(callback) {
    const cleanUpCallBack = Cypress.env("cleanUpCallBack");
    cleanUpCallBack.push(callback);
    Cypress.env("cleanUpCallBack", cleanUpCallBack);
    
  }

  // static addObjectToEnv(callback) {
  //   const objectToEnv = Cypress.env("itemId");
  //   objectToEnv.push(callback);
  //   Cypress.env("itemId", objectToEnv);
  // }

  static InputTodoItem(TodoItem) {
    cy.get(this.descriptionInput)
      .should("be.visible")
      .then(() => {
        cy.get("input").type(TodoItem);
      });
  }

  static AddItemAction() {
    cy.get(this.addButton)
      .should("be.visible")
      .then(() => {
        cy.intercept("POST", this.url_todoList).as("itemJustAdded");
        cy.get(this.addButton).click();
      });

    cy.wait("@itemJustAdded").then((intercept) => {

      Cypress.env("itemId", {
        x: intercept.response.body,
        y: intercept.request.body.description,
      });

      // this.addObjectToEnv({
      //   x: intercept.response.body,
      //   y: intercept.request.body.description,
      // })

      this.addCleanUpCallBack(() => {
        cy.log(`CLEAN UP CALL BACK:`);
        this.delete(this.url_todoList, Cypress.env("itemId"));
      });
    });
  }

  static delete(url, itemDesc, index) {
    cy.log(`DELETE request using: ${url}`);
    cy.request({
      method: "PUT",
      url: `http://localhost:3002${url}/${itemDesc.x}`,
      body: {
        id: itemDesc.x,
        description: itemDesc.y,
        isCompleted: true,
      },
    }).then((response) => {
      cy.wrap(response).its("status").should("eq", 204);
    });

  }

  static AddItemPostRequest(item) {
    this.post(item, this.url_todoList);

    // cy.wrap(Cypress.env("itemId")).then((array)=> {
    //   cy.log("*************444*");
    //   const deleteObj = array[1]
    //   cy.log(deleteObj)
    //  cy.log("*************444*");
    //  })

    this.addCleanUpCallBack(() => {
      cy.log(`CLEAN UP CALL BACK:`);
     this.delete(this.url_todoList, Cypress.env("itemId2"));
    });

  }

  static post(item, url) {
    cy.log(`POST request using: ${url}`);
    cy.request({
      method: "POST",
      url: `http://localhost:3002${url}`,
      body: {
        description: item,
      },
    }).then((response) => {
      let descriptionBody = response.allRequestResponses[0]["Request Body"];

      Cypress.env("itemId2", {
        x: response.body,
        y: JSON.parse(descriptionBody).description,
      });

      // cy.log("**************");
      // cy.log(Cypress.env("itemId"));
      // cy.log("**************");


      // this.addObjectToEnv({
      //   x: response.body,
      //   y: JSON.parse(descriptionBody).description,
      // })

      cy.wrap(response).its("status").should("eq", 201);
    });
  }



  static verifyItemOnList(itemToSearch) {
    cy.get(".table")
      .find("tbody > tr > td")
      .each((item) => {
        if (item.text() == itemToSearch) {
          cy.get(item).should("contain", itemToSearch);
        }
      });

    // cy.log("ALOOOO::::::::")
    // cy.log(Cypress.env("itemId"));
  }


} // end of class
