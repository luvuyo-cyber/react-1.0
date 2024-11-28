import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Rating from "./Rating";
import { Button } from "react-bootstrap";
import Products from "./Products";

class App extends Component {
  render() {
    return (
      <div>
        <h1>React App</h1>
        {/* <Rating rating="1" />
        <Rating rating="2" />
        <Rating rating="3" />
        <Rating rating="4" />
        <Rating rating="5" />
        <Button variant="danger">Button</Button> */}
        <Products />
      </div>
    );
  }
}

export default App;
