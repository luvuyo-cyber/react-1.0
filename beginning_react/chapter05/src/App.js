import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Rating from "./Rating";
import { Button } from "react-bootstrap";
import Products from "./Products";
import JumbotronComponent from "./JumboTronComponent";

class App extends Component {
  render() {
    return (
      <div>
        <h1>React App</h1>
        <JumbotronComponent>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </JumbotronComponent>
      </div>
    );
  }
}

export default App;
