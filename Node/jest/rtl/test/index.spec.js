import React from 'react';
import { render, cleanup } from '@testing-library/react';
import assert from 'assert';
import axeDevtools from '@axe-devtools/browser';
import Reporter from '@axe-devtools/reporter';
import rimraf from 'rimraf';

const App = () => <h1>Hello World</h1>;

describe('@axe-devtools/browser, jest, @testing-library/react', () => {
  let reporter;

  beforeEach(() => {
    rimraf.sync('./a11y-results*');
    reporter = new Reporter('A11yResults', './a11y-results');
  });

  afterEach(() => {
    reporter.buildHTML('./a11y-results-html');
    cleanup();
  });

  it('should test @testing-library/react component', async () => {
    // @testing-library/react automatically appends the container to the DOM
    const { container } = render(<App />);
    const results = await axeDevtools.run(container);
    reporter.logTestResult('rtl-component', results);
    assert.equal(results.violations.length, 0);
  });
});
