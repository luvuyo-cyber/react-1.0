import React, { useContext, useState } from "react";
import { TodosContext } from "./App";
import { Table, Form, Button } from "react-bootstrap";

const ToDoList = () => {
  //receive state and dispatch from app.jsx
  const { state, dispatch } = useContext(TodosContext);
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode ? "Edit" : "Add";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      dispatch({ type: "edit", payload: { ...editTodo, text: todoText } });
      setEditMode(false);
      setEditTodo(false);
    } else {
      dispatch({ type: "add", payload: todoText });
    }
    setTodoText("");
  };
  return (
    <div>
      {/* {state.todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
        </li>
      ))} */}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter To Do"
            onChange={(event) => setTodoText(event.target.value)}
            value={todoText}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {buttonTitle}
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>To Do</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.text}</td>
              <td>
                <button
                  onClick={() => {
                    setTodoText(todo.text);
                    setEditMode(true);
                    setEditTodo(todo); //contains todo object to be edited
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    dispatch({ type: "delete", payload: todo });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ToDoList;
