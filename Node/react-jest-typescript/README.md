# React/Jest AxeDevtools Matcher Library

<p align="center">
        <img src="https://miro.medium.com/max/600/1*RQwRLQ0yyCvYmRn_Nst5yg.png" alt="" height="70px" width="100px"  />   
<img src="https://dequeuniversity.com/assets/images/logos/attest_hero_blue.png" height="70px" width="100px" alt="" />
</p>

## Prerequisites
  * NPM
  * NodeJS (6.10 or higher)
  * Jest 
  * Enzyme
  * React
  
## Integration information
In order to use axedevtools with React+Jest you will need to include it as a dependency via NPM or Yarn

    "@axe-devtools/jest": "file:axe-devtools-jest-1.0.0.tgz",
    "@axe-devtools/reporter": "^4.1.1",
    

## Basic Setup

In order to setup axe-devtools into React with React Dom use the following steps: 
<br/><br/>

     import { axeDt, toHaveZeroViolations } from "@axe-devtools/jest";
     import AxeDevToolsReporter from "@axe-devtools/reporter";

<b>Step 2:</b>
Setup a test case and call expect(results).toHaveZeroViolations() in your test case. 

```js
   test('Bad Component has zero violations', async (done) => {
     const {container} = render(<Badcomp></Badcomp>);
     const results = await axeDt(container);
     expect(results).toHaveZeroViolations();
     done();
});
```

Now you have a basic integration of axeDevtools into a Jest test case using react-dom!
    
    
## Reports

## Install and Setup

Create a new axeReporter object at the top and give it a global suite name (ex: "Deque-React-Lib") and then a path to where the results should go. 

```js
const axeReporter = new AxeDevToolsReporter("Deque-React-Lib", "./a11y-results/");
```

### Using the Reporter

When using axeDevTools with React+Jest, you will have to install the dependency axeDevtools-reporter into your project as a dependency. 
<br/><br/>
From there everytime you run an axe.run() scan, you will take the results and log them. 

```js
  test('Bad Component has zero violations', async (done) => {
     const {container} = render(<Badcomp></Badcomp>);
     const results = await axeDt(container);
     axeReporter.logTestResult("badComp", results);
     expect(results).toHaveZeroViolations();
     done();
});
```

Once complete, after ALL the test cases have run, you can use the axedevtools reporter to create CSV, HTML, XML reports off of the logged test result objects. 

```js
  afterAll(async () => {
    await reporter.buildHTML('./a11y-results/html/');
    await reporter.buildJUnitXML('./a11y-results/xml/');
    await reporter.buildCSV('./a11y-results/csv/');
    await driver.quit();
});