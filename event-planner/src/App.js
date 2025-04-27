import React, { useState, useEffect } from "react";
import { signUp, logIn, logOut } from "./auth";
import { auth } from "./firebase";
import {
  addEvent,
  getUserEvents,
  deleteEvent,
  updateEvent,
  createUserProfile,
} from "./firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Form,
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [events, setEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadEvents(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadEvents = async (userId) => {
    const userEvents = await getUserEvents(userId);
    setEvents(userEvents);
  };

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId);
    loadEvents(user.uid);
  };

  const handleAddEvent = async () => {
    if (user) {
      await addEvent(user.uid, eventTitle, eventDate);
      setEventTitle("");
      setEventDate("");
      loadEvents(user.uid);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setAlert({
        type: "danger",
        message: "Please enter a valid email address.",
      });
      return;
    }
    if (!validatePassword(password)) {
      setAlert({
        type: "danger",
        message: "Password must be at least 6 characters long.",
      });
      return;
    }

    try {
      await signUp(email, password);
      const currentUser = auth.currentUser;
      if (currentUser) {
        await createUserProfile(currentUser.uid, currentUser.email);
      }
      setAlert({ type: "success", message: "Account created successfully!" });
    } catch (error) {
      let errorMessage = "Sign-up failed. Try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please log in instead.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password.";
      }
      setAlert({ type: "danger", message: errorMessage });
    }
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  const handleLogIn = async () => {
    if (!validateEmail(email)) {
      setAlert({
        type: "danger",
        message: "Please enter a valid email address.",
      });
      return;
    }
    if (!validatePassword(password)) {
      setAlert({ type: "danger", message: "Please enter your password." });
      return;
    }

    try {
      const userCredential = await logIn(email, password);
      if (userCredential.user) {
        setAlert({ type: "success", message: "Logged in successfully!" });
      }
    } catch (error) {
      let errorMessage = "Login failed. Check your credentials.";
      if (error.code === "auth/user-not-found") {
        errorMessage =
          "No account found with this email. Please sign up first.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      }
      setAlert({ type: "danger", message: errorMessage });
    }
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setUser(null);
      setEvents([]);
      setEmail("");
      setPassword("");
      setAlert({ type: "success", message: "Logged out successfully!" });
    } catch (error) {
      setAlert({ type: "danger", message: "Logout failed. Try again." });
    }
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  const startEdit = (event) => {
    setEditEventId(event.id);
    setEditTitle(event.title);
    setEditDate(event.date);
  };

  const handleCancel = () => {
    setEditEventId(null);
    setEditTitle("");
    setEditDate("");
  };

  const handleSave = async (eventId) => {
    await updateEvent(eventId, {
      title: editTitle,
      date: editDate,
    });
    setEditEventId(null);
    loadEvents(user.uid);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Event Planner</Navbar.Brand>
          <Nav className="ms-auto">
            {user && (
              <Button variant="outline-light" onClick={handleLogOut}>
                Logout
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container>
        {alert.message && (
          <Alert
            variant={alert.type}
            onClose={() => setAlert({ type: "", message: "" })}
            dismissible
            className="mt-3"
          >
            {alert.message}
          </Alert>
        )}

        {user ? (
          <>
            <h2 className="mb-4">Welcome, {user.email}</h2>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Create New Event</Card.Title>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddEvent();
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Event Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter event title"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Add Event
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <h3 className="mb-3">Your Events</h3>
            <ListGroup>
              {events.map((event) => (
                <ListGroupItem key={event.id} className="mb-2">
                  {editEventId === event.id ? (
                    <Row className="align-items-center">
                      <Col>
                        <Form.Control
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="mb-2"
                        />
                        <Form.Control
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                        />
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="success"
                          onClick={() => handleSave(event.id)}
                          className="me-2"
                        >
                          Save
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="align-items-center">
                      <Col>
                        <h5 className="mb-1">{event.title}</h5>
                        <small className="text-muted">{event.date}</small>
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="primary"
                          onClick={() => startEdit(event)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  )}
                </ListGroupItem>
              ))}
            </ListGroup>
          </>
        ) : (
          <Card className="mx-auto" style={{ maxWidth: "400px" }}>
            <Card.Body className="p-4">
              <Card.Title className="text-center mb-3">
                Login or Sign Up
              </Card.Title>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="sm"
                    isInvalid={!validateEmail(email) && email !== ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="sm"
                    isInvalid={!validatePassword(password) && password !== ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters long.
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={handleSignUp} size="sm">
                    Sign Up
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={handleLogIn}
                    size="sm"
                  >
                    Log In
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}

export default App;
