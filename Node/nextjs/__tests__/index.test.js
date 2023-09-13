import 'jest-canvas-mock'
import "@testing-library/jest-dom";
import Home from '../src/pages/index'
import { fireEvent, render, screen, waitFor, act, cleanup } from "@testing-library/react";
import axeDevtools from '@axe-devtools/browser'
import Reporter from '@axe-devtools/reporter'
import rimraf from 'rimraf'

describe('@axe-devtools/browser, jest, @testing-library/react', () => {
  let reporter

  beforeAll(() => {
    // https://github.com/dequelabs/axe-core/blob/develop/README.md?plain=1#L83
    axeDevtools.configure({
      rules: [
        {
          id: 'color-contrast',
          enabled: false
        }
      ]
    })
    rimraf.sync('./a11y-results*')
    reporter = new Reporter('a11y-results', './a11y-results')
  })

  afterAll(() => {
    reporter.buildHTML('./a11y-results')
    reporter.buildCSV('./a11y-results')
    reporter.buildJUnitXML('./a11y-results')
    cleanup()
  })

  it('ToDo App Home Page', async () => {
    const { container } = render(<Home />)
    
    //Accessibility scan with axe DevTools API
    const results = await axeDevtools.run(container)
    reporter.logTestResult('home-page', results)
  })

  it("Add ToDo", async () => {
    const { addToDocontainer } = render(<Home />);

    const todoInput = screen.getByTestId("todo-input");
    const addTodoButton = screen.getByTestId("add-todo");
    const todoList = screen.getByTestId("todo-list");

    await act(async () => {
      fireEvent.change(todoInput, { target: { value: "New Todo" } });
      addTodoButton.click();
    });
    await waitFor(() => {
      expect(todoList).toHaveTextContent("New Todo");
    });

    //Perform Accessibility Scan with axe DevTools API
    const results2 = await axeDevtools.run(addToDocontainer)
    reporter.logTestResult('add-todo-component', results2)
  });

  it("Delete ToDo", async () => {
    const { container } = render(<Home />);

    const todoInput = screen.getByTestId("todo-input");
    const addTodoButton = screen.getByTestId("add-todo");

    fireEvent.change(todoInput, { target: { value: "Todo 1" } });
    fireEvent.click(addTodoButton);
    const deleteTodoButton = screen.getByTestId("delete-todo-0");
    fireEvent.click(deleteTodoButton);
    const todoList = screen.getByTestId("todo-list");
    await waitFor(() => {
      expect(todoList).toBeEmptyDOMElement();
    });

    //Perform Accessibility Scan with axe DevTools API
    const results = await axeDevtools.run(container)
    reporter.logTestResult('delete-todo-component', results)
  });
})
