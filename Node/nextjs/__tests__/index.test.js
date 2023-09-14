import 'jest-canvas-mock'
import "@testing-library/jest-dom";
import Home from '../src/pages/index'
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import axeDevtools from '@axe-devtools/browser'
import Reporter from '@axe-devtools/reporter'
import rimraf from 'rimraf'
import userEvent from '@testing-library/user-event'

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

  describe('given the ToDo App home page', () => {
    it('renders the page', async () => {
      const { container } = render(<Home />)
      
      //Accessibility scan with axe DevTools API
      const results = await axeDevtools.run(container)
      reporter.logTestResult('home-page', results)
    })
  });

  describe('When adding a new todo item', () => {
    it("should append onto the end of the list", async () => {
      const { addToDocontainer } = render(<Home />);

      const todoInput = screen.getByTestId("todo-input");
      const addTodoButton = screen.getByTestId("add-todo");
      const todoList = screen.getByTestId("todo-list");

      await userEvent.type(todoInput, 'New Todo');
      await userEvent.click(addTodoButton);

      await waitFor(() => {
        expect(todoList).toHaveTextContent("New Todo");
      });

      //Perform Accessibility Scan with axe DevTools API
      const results = await axeDevtools.run(addToDocontainer)
      reporter.logTestResult('add-todo-component', results)
    });
  });

  describe('When deleting a todo item', () => {
    it("should be removed from the list", async () => {
      const { container } = render(<Home />);

      const todoInput = screen.getByTestId("todo-input");
      const addTodoButton = screen.getByTestId("add-todo");

      await userEvent.type(todoInput, 'Todo 1');
      await userEvent.click(addTodoButton);
      const deleteTodoButton = screen.getByTestId("delete-todo-0");
      await userEvent.click(deleteTodoButton);
      const todoList = screen.getByTestId("todo-list");
      await waitFor(() => {
        expect(todoList).toBeEmptyDOMElement();
      });

      //Perform Accessibility Scan with axe DevTools API
      const results = await axeDevtools.run(container)
      reporter.logTestResult('delete-todo-component', results)
    });
  });
})
