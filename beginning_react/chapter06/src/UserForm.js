// Render Prop
import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

class UserForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Any place in your app!</h1>
        <Formik
          //set our initial values
          initialValues={{ email: "", password: "" }}
          //validate our values
          validate={(values) => {
            //store error messages
            const errors = {};
            //if email is empty
            if (!values.email) {
              errors.email = "Required";
            } else if (
              //check for valid email address
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            } else if (values.email.length < 15) {
              errors.email = "Email address too short";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 8) {
              errors.password = "Password too short";
            }
            return errors;
          }}
          //pass in form values
          //alert box with values in json object
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {/* the form */}
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" />

              {/* style our error messages to be more prominent */}
              <span style={{ color: "red", fontWeight: "bold" }}>
                <ErrorMessage name="email" component="div" />
              </span>

              <Field type="password" name="password" />

              {/* style our error messages to be more prominent */}
              <span style={{ color: "red", fontWeight: "bold" }}>
                <ErrorMessage name="password" component="div" />
              </span>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default UserForm;
