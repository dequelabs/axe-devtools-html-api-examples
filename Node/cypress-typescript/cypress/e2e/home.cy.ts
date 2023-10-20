describe('Deque Mars', () => {
  it('Should navigate to landing page', () => {
    cy.visit('https://dequeuniversity.com/demo/mars/')
    
    cy.axeAnalyze({name: 'deque-mars-landing-page'})
    cy.getAxeResults().then((axeResults) => {
      const resultsDir = './a11y-results/'
      cy.writeFile(`${resultsDir}/deque-mars-landing-page.json`, axeResults)
      cy.task('reportAsHTML', { resultsDir })
    })

    cy.get('#vap-section > h1').contains('Destination Mars')
  })
})