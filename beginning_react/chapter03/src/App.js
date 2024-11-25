import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Products from "./Products";
import Rating from "./Rating";

class App extends Component {
  render() {
    //disable button on condition using css class
    const isValid = true;

    //passing data into our rating component using props

    return (
      <div>
        <h1>React App</h1>
        <Rating rating="1" />
        <Rating rating="2" />
        <Rating rating="3" />
        <Rating rating="4" />
        <Rating rating="5" />
        <Button variant="primary" disabled={!isValid}>
          Button
        </Button>
      </div>
    );
  }
}

export default App;
