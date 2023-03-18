/// <reference types="cypress" />
const { defineConfig } = require("cypress");

const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    specPattern: ["**/*.{feature,features}"],
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // const options = browserify.defaultOptions;
      //options.browserifyOptions.plugin.unshift(['babel-plugin-root-import']);
      //options.browserifyOptions.transform[1][1].babelrc = true;

      on("file:preprocessor", cucumber());

      // on("before:browser:launch", (browser = {}, launchOptions) => {
      //   if (browser.name === "chrome") {
      //     launchOptions.args.push("--disable-extensions"); //https://github.com/cypress-io/cypress/issues/5969
      //     return launchOptions;
      //   }
      //   return launchOptions;
      // });

      return config;
    },
  },
});

//testFiles: ["**/*.{feature,features}"],
//  specPattern: 'cypress/integration/**/*.cy.js',
