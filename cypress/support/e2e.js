// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";


after(() => {
  //clean up the state on after, to avoid duplication.
    cy.log(Cypress.env("cleanUpCallBack"));
    for (let callback of Cypress.env("cleanUpCallBack")) {
      callback();
    }
});



// Alternatively you can use CommonJS syntax:
// require('./commands')

//Hide fetch/XHR requests

const app = window.top;
if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
  const style = app.document.createElement("style");
  const style1 = app.document.createElement("style");

  style.innerHTML = ".command { display: none }";
  style.setAttribute("data-hide-command-log-request", "");

  app.document.head.appendChild(style);

  style1.innerHTML =
    ".command.command-name-step, .command-name-assert, .reporter .command-name-log { display: block }";
  style.setAttribute("data-hide-command-log-request", "");
  app.document.head.appendChild(style1);
}
