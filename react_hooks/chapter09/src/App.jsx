import React, { useReducer } from "react";

import ToDoList from "./ToDoList";

const todosInitialState = {
  todos: [],
};

export const TodosContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoList />
    </TodosContext.Provider>
  );

  function todosReducer(state, action) {
    switch (action.type) {
      case "get":
        return { ...state, todos: action.payload };

      case "add":
        // const newToDo = { id: uuidv4(), text: action.payload };
        const addedToDos = [...state.todos, action.payload]; //add new todo onto array
        return { ...state, todos: addedToDos }; //assign new array to todos

      case "delete":
        const filteredTodoState = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        return { ...state, todos: filteredTodoState };

      case "edit":
        const updatedToDo = { ...action.payload };
        const updatedToDoIndex = state.todos.findIndex(
          (t) => t.id === action.payload.id
        );
        const updatedToDos = [
          ...state.todos.slice(0, updatedToDoIndex),
          updatedToDo,
          ...state.todos.slice(updatedToDoIndex + 1),
        ];
        return { ...state, todos: updatedToDos };

      default:
        return todosInitialState;
    }
  }
};

export default App;
