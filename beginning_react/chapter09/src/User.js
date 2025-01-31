import React, { Component } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import { Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showDeleteDialog: false,
      selectedUser: {},
    };
    this.add = this.add.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.delete = this.delete.bind(this);
  }

  //access our database
  //this is where server requests and state updates should occur

  //PART 1:
  //   componentDidMount() {
  //     firebase
  //       .database() //we get our firebase database
  //       .ref("/") //return location in database corresponding to provided path (our list of users is a root node)
  //       //we then listen to data changes through callback function
  //       .on("value", (snapshot) => {
  //         console.log(snapshot.val()); //extract the contents of the snapshot as an object by calling val() method
  //       });
  //   }

  componentDidMount() {
    firebase
      .database()
      .ref("/")
      .on("value", (snapshot) => {
        let returnArr = [];
        //extract all user data and its key
        snapshot.forEach((data) => {
          var user = data.val(); //extract data from firebase (an object)
          user["key"] = data.key; //we store each data entry with a unique key
          returnArr.push(user); //push modified user object with its "key" to returnArr
        });
        this.setState({
          users: returnArr,
        });
      });
  }

  add(e) {
    this.props.history.push("/add");
  }

  //show delete modal  and sets selectedUser to user that is clicked
  openDeleteDialog(user) {
    this.setState({
      showDeleteDialog: true,
      selectedUser: user,
    });
  }

  //hide the delete modal and set selectedUser to null
  closeDeleteDialog() {
    this.setState({
      showDeleteDialog: false,
      selectedUser: {},
    });
  }

  delete(e) {
    firebase
      .database()
      .ref("/" + this.state.selectedUser.key)
      .remove()
      .then((x) => {
        console.log("SUCCESS");
        this.closeDeleteDialog();
      })
      .catch((error) => {
        alert("could not delete the user!");
        console.log("ERROR", error);
      });
  }

  render() {
    const listUsers = this.state.users.map((user) => (
      <tr key={user.key}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          <Link to={`/edit/${user.key}`}>Edit</Link>
        </td>
        <td>
          <Button onClick={this.openDeleteDialog.bind(this, user)}>
            Remove
          </Button>
        </td>
      </tr>
    ));
    return (
      <div>
        <Button variant="primary" onClick={this.add}>
          Add
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{listUsers}</tbody>
        </Table>
        <Modal
          show={this.state.showDeleteDialog}
          onHide={this.closeDeleteDialog}
        >
          <Modal.Header>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete:{" "}
              {this.state.selectedUser.username}?
            </p>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.delete}>Delete</Button>
            <Button onClick={this.closeDeleteDialog}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default User;
