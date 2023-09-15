import { useState } from "react";
import styles from "./home.module.css";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        value={newTodo}
        data-testid="todo-input"
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo} className={styles.button} data-testid="add-todo">
        Add Todo
      </button>
      <ul className={styles.todoList} data-testid="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={styles.todoItem}>
            {todo}
          </li>
        ))}
      </ul>
      {todos.map((todo, index) => (
        <div key={index}>
          <button
            onClick={() => deleteTodo(index)}
            className={styles.button}
            data-testid={`delete-todo-${index}`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
  
}
