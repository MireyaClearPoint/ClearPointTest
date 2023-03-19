// I usually write the Base API here for scalability and reuse in large project
// Althought not needed in this small project, it is a good way to show how the POM design pattern 
//and this scaffolding approach to help us to mantain large projects and keep it DRY.

export default class TodoListAPIBase {
    
  static post(url, jsonBody = null) {
    cy.request({
      method: "POST",
      url: url,
      body: jsonBody,
      headers: {
        Authorization: "",
      },
    }).then((response) => {
      expect(response.status).be.oneOf([200, 201, 204]);
      cy.wrap(response).as("postResponse");
    });
    return cy.get("@postResponse");
  }

  static patch(url, jsonBody) {
    cy.request({
      method: "PATCH",
      url: url,
      body: jsonBody,
      headers: {
        Authorization: "",
      },
    }).then((response) => {
      cy.wrap(response).its("status").should("eq", 204);
      cy.wrap(response.body).as("patchResponse");
    });
    return cy.get("@patchResponse");
  }

  static put(url, jsonBody) {
    cy.request({
      method: "PUT",
      url: url,
      body: jsonBody,
      headers: {
        Authorization: "",
      },
    }).then((response) => {
      cy.wrap(response).as("putResponse");
      cy.wrap(response).its("status").should("eq", 204);// No content response
    });
    return cy.get("@putResponse");
  }


}
