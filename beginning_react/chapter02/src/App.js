import React, { Component } from "react";
import Products from "./Products"; //import our product component

//we can put javascript expressions in jsx by wrapping in curly braces
class App extends Component {
  //our function
  formatName(user) {
    return user.firstName + " " + user.lastName;
  }

  render() {
    //our user object
    const user = {
      firstName: "Luvuyo",
      lastName: "Mazibuko",
    };

    return (
      <div>
        <h1>React App</h1>
        <Products />
        <h3>Hello, {this.formatName(user)}</h3>
      </div>
    );
  }
}

export default App;
