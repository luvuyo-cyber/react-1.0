import React, { Component } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Media, Form, FormGroup, FormControl, Button } from "react-bootstrap";

class Github extends Component {
  //constructors should be lightweight and not contain any costly operations, for basic initializations like state
  constructor() {
    super();
    this.state = {
      //create state variables
      isLoading: false,
      searchTerm: "",
      data: [],
    };

    //bindings for the handleChange and handleSubmit methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //is called after the constructor
  //   componentDidMount() {
  //     this.getGitHubData("greg");
  //   }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.getGitHubData(this.state.searchTerm);
  }

  //handles changing searchTerm state
  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  //returns github data from API endpoint, using axios
  getGitHubData(_searchTerm) {
    axios
      .get("https://api.github.com/search/users?q=" + _searchTerm)
      .then((res) => {
        this.setState({
          isLoading: false,
          data: res.data.items, //assign results to our empty array
        });
        console.log(res.data.items);
      });
  }

  render() {
    const listUsers = this.state.data.map((user) => (
      <Media key={user.id}>
        <a href={user.html_url}>
          <img
            width={64}
            height={64}
            className="mr-3"
            src={user.avatar_url}
            alt="Generic placeholder"
          />
        </a>
        <Media.Body>
          <h5>Login: {user.login}</h5>
          <p>ID: {user.id}</p>
        </Media.Body>
      </Media>
    ));

    // && conditional makes it visible when loading
    // return <div>{this.state.isLoading && <h4>Getting data...</h4>}</div>;

    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineName">
            <FormControl
              type="text"
              value={this.state.searchTerm}
              placeholder="Enter Search Term"
              onChange={this.handleChange}
            />
          </FormGroup>{" "}
          <Button type="submit">Search</Button>
        </Form>
        <h3>Github Users Results</h3>
        {this.state.isLoading && (
          <ReactLoading type="spinningBubbles" color="#444" />
        )}
        {listUsers}
      </div>
    );
  }
}

export default Github;
