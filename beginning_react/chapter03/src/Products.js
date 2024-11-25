import React, { Component } from "react";

class Products extends Component {
  render() {
    const products = ["shampoo", "hairbrush", "soap"];

    const listProducts = products.map((item) => (
      <li key={products.toString()}>{item}</li>
    ));

    return (
      <div>
        <h2>Products</h2>
        <h2>{listProducts}</h2>
      </div>
    );
  }
}

export default Products;
