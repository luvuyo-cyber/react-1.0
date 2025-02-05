import React from "react";
import Product from "./Product";

const Products = () => {
  const getProducts = () => {
    return [
      {
        imageUrl: "http://loremflickr.com/150/150?random=1",
        productName: "Product 1",
        releasedDate: "28 November 2024",
        description: "Our first product.",
        rating: 1,
        numOfReviews: 11,
      },
      {
        imageUrl: "http://loremflickr.com/150/150?random=2",
        productName: "Product 2",
        releasedDate: "28 November 2024",
        description: "Our second product.",
        rating: 2,
        numOfReviews: 12,
      },
      {
        imageUrl: "http://loremflickr.com/150/150?random=3",
        productName: "Product 3",
        releasedDate: "28 November 2024",
        description: "Our third product.",
        rating: 3,
        numOfReviews: 13,
      },
      {
        imageUrl: "http://loremflickr.com/150/150?random=4",
        productName: "Product 4",
        releasedDate: "28 November 2024",
        description: "Our fourth product.",
        rating: 4,
        numOfReviews: 14,
      },
      {
        imageUrl: "http://loremflickr.com/150/150?random=5",
        productName: "Product 5",
        releasedDate: "28 November 2024",
        description: "Our fifth product.",
        rating: 5,
        numOfReviews: 15,
      },
    ];
  };

  const products = getProducts();

  const listProducts = products.map((product) => (
    <Product key={product.productName} data={product} />
  ));
  return (
    <div>
      {listProducts.length > 0 && <ul>{listProducts}</ul>}
      {listProducts.length == 0 && <ul>No Products to display.</ul>}
    </div>
  );
};

export default Products;
