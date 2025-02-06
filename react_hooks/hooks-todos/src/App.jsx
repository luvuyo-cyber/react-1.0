import React, { useContext, useReducer } from "react";
// import { UserContext } from "./main";
import { Button } from "react-bootstrap";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";

// const initialState = {
//   count: 0,
// };

const todosInitialState = {
  todos: [
    { id: 1, text: "Finishing writing hooks chapter" },
    { id: 2, text: "Play with kids" },
    { id: 3, text: "Read the bible" },
  ],
};

export const TodosContext = React.createContext();

const App = () => {
  // =======================first part=======================================
  // const value = useContext(UserContext);
  // return (
  //   <div>
  //     {/* example 1: */}
  //     <h1>{props.username}</h1>
  //     {/* example 2: */}
  //     <Navbar username={props.username} />
  //     {/* example 3: */}
  //     <UserContext.Consumer>
  //       {(value) => <div>Received, {value}</div>}
  //     </UserContext.Consumer>
  //     {/* example 4: */}
  //     Received, {value}
  //   </div>
  // );
  // =======================counter======================================
  //   const [state, dispatch] = useReducer(reducer, initialState);
  //   return (
  //     <div>
  //       Count: {state.count}
  //       <br />
  //       <Button variant="success" onClick={() => dispatch({ type: "increment" })}>
  //         Increment
  //       </Button>
  //       <Button variant="danger" onClick={() => dispatch({ type: "decrement" })}>
  //         Decrement
  //       </Button>
  //       <Button variant="primary" onClick={() => dispatch({ type: "reset" })}>
  //         Reset
  //       </Button>
  //     </div>
  //   );
  // };
  // function reducer(state, action) {
  //   switch (action.type) {
  //     case "increment":
  //       return { count: state.count + 1 };
  //     case "decrement":
  //       return { count: state.count - 1 };
  //     case "reset":
  //       return initialState;
  //     default:
  //       return initialState;
  //   }
  // ===========================todos========================================
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoList />
    </TodosContext.Provider>
  );

  function todosReducer(state, action) {
    switch (action.type) {
      case "add":
        const newToDo = { id: uuidv4(), text: action.payload };
        const addedToDos = [...state.todos, newToDo]; //add new todo onto array
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
