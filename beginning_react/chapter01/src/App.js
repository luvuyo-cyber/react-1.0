/*
- index.js is the entry point of our app.
- components can either be functional or class based
*/
import React, { Component } from "react";

class App extends Component {
  //class based component
  render() {
    return (
      <div>
        <h1>My React App</h1>
      </div>
    );
  }
}

export default App;
