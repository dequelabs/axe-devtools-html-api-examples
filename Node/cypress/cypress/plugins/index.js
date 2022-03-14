/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const axeDevToolsPlugin = require('@axe-devtools/cypress/dist/plugin');
const Reporter = require('@axe-devtools/reporter').default
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  axeDevToolsPlugin(on);

  on('task', {
    // task to create HTML report
    reportAsHTML: async ({ resultsDir, branding = 'axeDevToolsCypress' }) => {
      reporter = new Reporter(branding, resultsDir)
      await reporter.buildHTML(resultsDir);
      return null
    },
    // task to create CSV report
    reportAsCSV: async ({ resultsDir, branding = 'axeDevToolsCypress' }) => {
      reporter = new Reporter(branding, resultsDir)
      await reporter.buildCSV(resultsDir);
      return null
    },
    // task to create Junit XML report
    reportAsJunit: async ({ resultsDir, branding = 'axeDevToolsCypress' }) => {
      reporter = new Reporter(branding, resultsDir)
      await reporter.buildJUnitXML(resultsDir);
      return null
    }
  })

  return config;
}


