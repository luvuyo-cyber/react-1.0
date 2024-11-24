import React, { Component } from "react"; //import Component class that we use to extend

//jsx inserted into DOM as HTML
//must return a single root element
class Products extends Component {
  render() {
    const products = ["bread", "milk", "butter"];

    //map: creates new array by calling function on every element of original array
    const listProducts = products.map((item) => (
      <li key={products.toString()}>{item}</li>
    ));

    return (
      <div>
        <h2>Products</h2>
        <ul>{listProducts}</ul>
      </div>
    );
  }
}

//makes our component available to other files to import
export default Products;
