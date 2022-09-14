import '@axe-devtools/cypress'
describe('ABCD Tech Computers', () => {
  before(() => {
    cy.visit('http://abcdcomputech.dequecloud.com/laptopsandnotebooks.php')
  })

  it('Should have main navigation opened', () => {
    cy.get('#topnav').find('.active').contains('Laptops & Notebooks')
  })

  it('Sub navigation is structured properly', () => {
    cy.get('.holder')
      .find('.title')
      .contains('Our Location. Let us show it to you')

    cy.get('.holder').find('.title').find('img').should('exist')
  })

  /**
   * Analyzes page and creates a `result` object
   * Creates a json and HTML report using `result`
   */
  it('Should be accessible', () => {
    cy.axeAnalyze({ name: 'computers' })
    cy.getAxeResults().then(async results => {
      const resultsDir = './a11y-results/'
      await cy.writeFile(`${resultsDir}computers.json`, results)
      await cy.task('reportAsHTML', { resultsDir })
    })
  })
})
