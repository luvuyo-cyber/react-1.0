import React from "react";
import Rating from "./Rating";
import { Card } from "react-bootstrap";

const Product = (props) => {
  return (
    <div>
      <Card>
        <Card.Img
          style={{ width: "20rem", height: "20rem" }}
          className="mr-3"
          src={props.data.imageUrl}
          alt="Image"
        />
        <Card.Body>
          <h5>{props.data.productName}</h5>
          {props.data.releasedDate}
          <Rating
            rating={props.data.rating}
            numOfReviews={props.data.numOfReviews}
          />
          <p>{props.data.description}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
