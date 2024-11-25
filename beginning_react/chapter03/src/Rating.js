import React, { Component } from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io"; //import react icons from library

//passing data into our component using props object
//conditional rendering of icons
//add state that manages data that will change in component

class Rating extends Component {
  //class constructor assigns the initial state
  constructor(props) {
    super(props);
    //rating is initialized with a value passed as a prop (this.props.rating), allowing the parent component to define the initial rating.
    this.state = { rating: this.props.rating };
  }

  //The method handleClick is responsible for updating the rating state when a star is clicked:
  //It receives the clicked star's value (ratingValue) and updates the component's state using setState.
  handleClick(ratingValue) {
    this.setState({ rating: ratingValue });
  }

  //The bind method ensures that handleClick is called with the correct 'this' context and passes the star's value as an argument.
  render() {
    return (
      <div>
        {/* <h3>Rating: {this.props.rating}</h3>
        {this.props.rating >= 1 ? <IoIosStar /> : <IoIosStarOutline />}
        {this.props.rating >= 2 ? <IoIosStar /> : <IoIosStarOutline />}
        {this.props.rating >= 3 ? <IoIosStar /> : <IoIosStarOutline />}
        {this.props.rating >= 4 ? <IoIosStar /> : <IoIosStarOutline />}
        {this.props.rating >= 5 ? <IoIosStar /> : <IoIosStarOutline />} */}

        <h3>Rating: {this.state.rating}</h3>
        {this.state.rating >= 1 ? (
          <IoIosStar onClick={this.handleClick.bind(this, 1)} />
        ) : (
          <IoIosStarOutline onClick={this.handleClick.bind(this, 1)} />
        )}
        {this.state.rating >= 2 ? (
          <IoIosStar onClick={this.handleClick.bind(this, 2)} />
        ) : (
          <IoIosStarOutline onClick={this.handleClick.bind(this, 2)} />
        )}
        {this.state.rating >= 3 ? (
          <IoIosStar onClick={this.handleClick.bind(this, 3)} />
        ) : (
          <IoIosStarOutline onClick={this.handleClick.bind(this, 3)} />
        )}
        {this.state.rating >= 4 ? (
          <IoIosStar onClick={this.handleClick.bind(this, 4)} />
        ) : (
          <IoIosStarOutline onClick={this.handleClick.bind(this, 4)} />
        )}
        {this.state.rating >= 5 ? (
          <IoIosStar onClick={this.handleClick.bind(this, 5)} />
        ) : (
          <IoIosStarOutline onClick={this.handleClick.bind(this, 5)} />
        )}
      </div>
    );
  }
}

export default Rating;
