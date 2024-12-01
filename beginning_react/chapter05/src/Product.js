import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

class Product extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Card>
          <Card.Img
            style={{ width: "20rem", height: "20rem" }}
            className="mr-3"
            src={this.props.data.imageUrl}
            alt="Image"
          />
          <Card.Body>
            <h5>{this.props.data.productName}</h5>
            {this.props.data.releasedDate}
            <Rating
              rating={this.props.data.rating}
              numOfReviews={this.props.data.numOfReviews}
            />
            <p>{this.props.data.description}</p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Product;
