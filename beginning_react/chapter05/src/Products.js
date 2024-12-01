import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
  //getProducts is called in the constructor
  //we return the results to a products variable
  products;

  constructor(props) {
    super(props);
    this.products = this.getProducts();
  }
  //responsible for returning a list of products
  getProducts() {
    return [
      // {
      //   imageUrl: "http://loremflickr.com/150/150?random=1",
      //   productName: "Product 1",
      //   releasedDate: "28 November 2024",
      //   description: "Our first product.",
      //   rating: 1,
      //   numOfReviews: 11,
      // },
      // {
      //   imageUrl: "http://loremflickr.com/150/150?random=2",
      //   productName: "Product 2",
      //   releasedDate: "28 November 2024",
      //   description: "Our second product.",
      //   rating: 2,
      //   numOfReviews: 12,
      // },
      // {
      //   imageUrl: "http://loremflickr.com/150/150?random=3",
      //   productName: "Product 3",
      //   releasedDate: "28 November 2024",
      //   description: "Our third product.",
      //   rating: 3,
      //   numOfReviews: 13,
      // },
      // {
      //   imageUrl: "http://loremflickr.com/150/150?random=4",
      //   productName: "Product 4",
      //   releasedDate: "28 November 2024",
      //   description: "Our fourth product.",
      //   rating: 4,
      //   numOfReviews: 14,
      // },
      // {
      //   imageUrl: "http://loremflickr.com/150/150?random=5",
      //   productName: "Product 5",
      //   releasedDate: "28 November 2024",
      //   description: "Our fifth product.",
      //   rating: 5,
      //   numOfReviews: 15,
      // },
    ];
  }

  render() {
    //returns a product component
    //product 'data' object is input for each product
    //each input provides product component with values for all its properties
    const listProducts = this.products.map((product) => (
      <Product key={product.productName} data={product} />
    ));
    return (
      <div>
        {/* returns products depending on if condition is met */}
        {listProducts.length > 0 ? (
          <ul>{listProducts}</ul>
        ) : (
          <ul>No products to display!</ul>
        )}
      </div>
    );
  }
}

export default Products;
