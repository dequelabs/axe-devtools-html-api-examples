import '@axe-devtools/cypress'
describe('ABCD Tech Computers', () => {
  const resultsDir = './a11y-results/'
  after(async () => {
    await cy.task('reportAsHTML', { resultsDir })
    await cy.task('reportAsJunit', { resultsDir })
    await cy.task('reportAsCSV', { resultsDir })
  })
  it('Cart page accessible', () => {
    cy.visit('http://abcdcomputech.dequecloud.com/cart.php')
    cy.axeAnalyze({ name: 'cart' })
    cy.getAxeResults().then(async results => {
      await cy.writeFile(`${resultsDir}cart.json`, results)
    })
  })
  it('Homepage accessible', () => {
    cy.visit('http://abcdcomputech.dequecloud.com')
    cy.axeAnalyze({ name: 'home' })
    cy.getAxeResults().then(async results => {
      await cy.writeFile(`${resultsDir}home.json`, results)
    })
  })
  it('Laptop Page accessible', () => {
    cy.visit('http://abcdcomputech.dequecloud.com/laptopsandnotebooks.php')
    cy.axeAnalyze({ name: 'computers', context: '#container' })
    cy.getAxeResults().then(async results => {
      await cy.writeFile(`${resultsDir}computers.json`, results)
    })
  })
})
