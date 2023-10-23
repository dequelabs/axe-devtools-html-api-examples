import { defineConfig } from "cypress";
import Reporter from '@axe-devtools/reporter'
const axeDevtoolsCypressPlugin = require("@axe-devtools/cypress/dist/plugin");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Inject the @axe-devtools/cypress plugin
      axeDevtoolsCypressPlugin(on);

      on('task', {
        // task to create HTML report
        reportAsHTML: async ({ resultsDir, branding = 'axeDevToolsCypress' }) => {
          const reporter = new Reporter(branding, resultsDir)
          await reporter.buildHTML(resultsDir);
          return null
        },

        // task to create CSV report
        reportAsCSV: async ({ resultsDir, branding = 'axeDevToolsCypress' }) => {
          const reporter = new Reporter(branding, resultsDir)
          await reporter.buildCSV(resultsDir);
          return null
        },

        // task to create Junit XML report
        reportAsJunit: async ({ resultsDir, branding = 'axeDevToolsCypress' }) => {
          const reporter = new Reporter(branding, resultsDir)
          await reporter.buildJUnitXML(resultsDir);
          return null
        },
      })
      
      return config
    },
  },
});
