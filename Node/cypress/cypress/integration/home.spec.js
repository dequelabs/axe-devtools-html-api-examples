import '@axe-devtools/cypress'
describe('ABCD Tech Home', () => {
  before(() => {
    cy.visit('http://abcdcomputech.dequecloud.com/')
  })

  it('Should have main navigation opened', () => {
    cy.get('#topnav').find('.active').contains('Home')
  })

  it('Should have main content structured properly', () => {
    cy.get('.fl_right').find('h3').contains('Welcome to Gefälscht CompuTech')

    cy.get('.fl_right')
      .find('a')
      .contains('contact Deque Systems')
      .then(el => {
        cy.wrap(el).invoke('attr', 'target').should('equal', '_blank')
      })
  })

  /**
   * Axe Ruleset - running analysis against specific ruleset(s)
   * .setAxeRuleset('508' | 'wcag2' | 'wcag2.1')
   * Default param wcag2
   *
   * Analyzes a page using wcag2.1
   * Creates a `results` object based on the ruleset
   * JSON file is create of the results
   * HTML file is created of the results
   */
  it('Should be accessible', () => {
    cy.setAxeRuleset('wcag2.1').axeAnalyze({ name: 'home' })
    cy.getAxeResults().then(async results => {
      const resultsDir = './a11y-results/'
      await cy.writeFile(`${resultsDir}home.json`, results)
      await cy.task('reportAsHTML', { resultsDir })
    })
  })
})
