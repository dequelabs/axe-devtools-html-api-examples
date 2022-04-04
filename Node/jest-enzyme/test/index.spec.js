import React from 'react';
import { mount } from 'enzyme';
import assert from 'assert';
import axeDevtools from '@axe-devtools/browser';
import Reporter from '@axe-devtools/reporter';
import rimraf from 'rimraf'

const App = () => <h1>Hello World</h1>;

describe('@axe-devtools/browser, jest, enzyme', () => {
  // axe-devtools can only run on connected DOM nodes so we need to mount each component
  // into the DOM tree
  let component;
  let reporter;
  let fixture = document.createElement('div');
  document.body.appendChild(fixture);

  beforeEach(() => {
    rimraf.sync('./a11y-results*')
    reporter = new Reporter('A11yResults', './a11y-results');
  });

  afterEach(() => {
    reporter.buildHTML('./a11y-results-html');
    component?.unmount();
  });

  it('should test enzyme component', async () => {
    component = mount(<App />, { attachTo: fixture });
    const results = await axeDevtools.run(fixture);
    reporter.logTestResult('enzyme-component', results);
    assert.equal(results.violations.length, 0);
  });
});
