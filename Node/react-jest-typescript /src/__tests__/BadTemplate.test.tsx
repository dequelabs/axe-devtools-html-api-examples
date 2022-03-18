import React from "react";
import { render } from "@testing-library/react";
import AxeDevtoolsReporter from "@axe-devtools/reporter";
import {configureAxeDt, toHaveZeroViolations} from "@axe-devtools/jest";
import { shallow, configure } from "enzyme";
import BadTemplate from "../BadTemplate";
import Adapter from 'enzyme-adapter-react-16';
import 'babel-polyfill'
import { AxeResults } from "axe-core";

expect.extend(toHaveZeroViolations);

describe("The Bad Template", () => {
  configure({adapter: new Adapter()});
  let axe, axeReporter; 
  const divWrapper = document.createElement("div");

  beforeAll(async()=>{
     document.body.appendChild(divWrapper);
     axe = configureAxeDt();
     axeReporter = new AxeDevtoolsReporter("A11y", "./a11y-results");
  });

  afterAll(async()=>{
    await axeReporter.buildHTML("./a11y-results/html");
    await axeReporter.buildCSV("./a11y-results/csv");
    await axeReporter.buildJUnitXML("./a11y-results/xml");
    document.body.removeChild(divWrapper);
  });

  test("should check for zero accessibility violations w/ config", async () => {
    const {container} = render(<BadTemplate/>);
    let config = {
      runOnly: {
        type: "tag",
        values: ["wcag2a"],
      },
    };
    const results = await axe(container, config);
    console.log("Total violations", results.violations.length);
    axeReporter.logTestResult("Bad-config", results);
    expect(results).toHaveZeroViolations();
  });

});