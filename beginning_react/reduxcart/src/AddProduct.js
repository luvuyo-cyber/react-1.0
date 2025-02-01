import React, { Component } from "react";

class AddProduct extends Component {
  state = {
    productName: "",
    productPrice: 0,
  };

  productNameChangeHandler = (event) => {
    this.setState({ productName: event.target.value });
  };

  productPriceChangeHandler = (event) => {
    this.setState({ productPrice: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <input
          type="text"
          placeholder="Product Name"
          onChange={this.productNameChangeHandler}
          value={this.state.productName}
        />
        <input
          type="number"
          placeholder="Product Price"
          onChange={this.productPriceChangeHandler}
          value={this.state.productPrice}
        />
        <button
          className="buttons"
          onClick={() => {
            this.props.addProduct(
              this.state.productName,
              this.state.productPrice
            );
          }}
        >
          Add Product
        </button>
      </div>
    );
  }
}

export default AddProduct;
