import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import cucumber from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild.js";

export default defineConfig({
  e2e: {
    specPattern:["**/*.{feature,features}", "cypress/e2e/integration/**/todoList.spec.js" ],  
    env: {
      cleanUpCallBack: [],
      itemId: [],
      itemId2: [],
      apiIdToDelete: "to be set"
    },
    viewportWidth: 1000,
    viewportHeight: 700,
    numTestsKeptInMemory: 0,
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await cucumber.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});
