import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const date = new Date().toUTCString();
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState("");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");

  // ACCESS DATE IN LOCAL STORAGE

  // The code to access local storage MUST always be written above the code to save to LS else it won't work.

  useEffect(() => {
    // 'todos' is the string we registered in the first useEffect hook.
    const temp = localStorage.getItem("todos");
    // parse data to retrieve the saved JSON in JS form
    const loadedTodos = JSON.parse(temp);

    // check if current user has any loadedTodos i.e. is not a first time user
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  // SAVE TO LOCAL STORAGE

  useEffect(() => {
    // stringify todos array into json before passing to browser
    const temp = JSON.stringify(todos);
    // setItem() method takes in 2 values. 1. a string for where we can access the data (can be named anything), 2. temporary JSON variable
    localStorage.setItem("todos", temp);
  }, [todos]);

  function inputTodo(e) {
    setAddTodo(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      text: addTodo,
      id: Date.now(),
      complete: false,
    };
    // push the newTodo variable into the todos array, then clear input field
    setTodos([...todos, newTodo]);
    setAddTodo("");
  }

  function handleEdit(id) {
    setEditing(id);
  }

  function handleDelete(id) {
    // newTodosArray == old array filtered, where for each todo in the old array, the todo id is not same as the id passed in for deletion.
    const newTodosArray = [...todos].filter((todo) => todo.id !== id);
    setTodos(newTodosArray);
  }

  function toggleComplete(id) {
    // map over todos array, find where todo.id matches the id passed in
    const toggledArray = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setTodos(toggledArray);
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditText("");
    setEditing(null);
  }

  return (
    <div className="App">
      <div className={todos.length === 0 ? "date" : "today"}>{date}</div>
      <form
        className={todos.length === 0 ? "form" : "todos-form"}
        onSubmit={handleSubmit}
      >
        <input
          className="todo-input"
          type="text"
          onChange={inputTodo}
          value={addTodo}
          required
        />
        <button className="add-todo" type="submit">
          Add Todo
        </button>
      </form>

      {todos.length === 0 ? (
        <div className="create">
          <h1>Create your To Do List here</h1>
        </div>
      ) : (
        <div className="todos">
          {todos.map((todo) => {
            return (
              <div className="single-todo" key={todo.id}>
                <li className="">
                  <input
                    type="checkbox"
                    onChange={() => toggleComplete(todo.id)}
                    checked={todo.complete}
                  />
                  {editing === todo.id ? (
                    <div className="edit-div">
                      <input
                        type="text"
                        onChange={(e) => setEditText(e.target.value)}
                        value={editText}
                        className="editing"
                      />

                      <i
                        class="ri-arrow-right-circle-fill"
                        onClick={() => editTodo(todo.id)}
                      ></i>
                    </div>
                  ) : (
                    <div className={todo.complete ? "todo complete" : "todo"}>
                      {todo.text}
                    </div>
                  )}

                  <div className="buttons">
                    <i
                      // class="fa fa-pencil"
                      class="ri-pencil-fill"
                      id="edit"
                      onClick={() => handleEdit(todo.id)}
                    ></i>

                    <i
                      // class="fa fa-trash"
                      class="ri-delete-bin-2-fill"
                      id="delete"
                      onClick={() => handleDelete(todo.id)}
                    ></i>
                  </div>
                </li>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
