import React from 'react'
import assert from 'assert'
import * as ReactDOM from 'react-dom/client'
import axeDevtools from '@axe-devtools/browser'
import Reporter from '@axe-devtools/reporter'
import rimraf from 'rimraf'

const App = () => <h1>Hello World</h1>

describe('@axe-devtools/browser, jest, react-dom', () => {
  let reporter
  const fixture = document.createElement('div')

  beforeEach(() => {
    rimraf.sync('./a11y-results*')
    reporter = new Reporter('A11yResults', './a11y-results')
    document.body.appendChild(fixture)
    const root = ReactDOM.createRoot(fixture)
    root.render(<App />)
  })

  afterEach(() => {
    reporter.buildHTML('./a11y-results')
    reporter.buildCSV('./a11y-results')
    reporter.buildJUnitXML('./a11y-results')
    document.body.removeChild(fixture)
  })

  it('should test react-dom component', async () => {
    const results = await axeDevtools.run(fixture)
    reporter.logTestResult('react-dom-component', results)
    assert.equal(results.violations.length, 0)
  })
})
