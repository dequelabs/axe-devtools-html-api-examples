import axeTestCafe from './axeTestCafe';
import AxeDevtoolsReporter from '@axe-devtools/reporter';
const reporter = new AxeDevtoolsReporter(
    'DevTools-Reporter',
    './a11y-results/json'
  );

var axe;

fixture `A set of examples that illustrate how to use TestCafe API`
    .page `https://broken-workshop.dequelabs.com/`
    .before(async t =>{
        axe = new axeTestCafe();
    })
    .after(async t =>{
        await reporter.buildHTML('./a11y-results/html/')
    })

   

test('Accessibility quick scan', async t => {
    const results = await axe.analyze(t);
    // 
    console.log(results);
    reporter.logTestResult('TestcafeScan2_1', results);
    // await t.expect(results.violations.length).eql(0);    
});