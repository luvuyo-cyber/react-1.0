import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import cartReducer from "./reducer";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

var destination = document.querySelector("#container");

var store = createStore(cartReducer);

ReactDOM.render(
  //pass store as props to make sure every component has access to the redux store
  <Provider store={store}>
    <App />
  </Provider>,
  destination
);
