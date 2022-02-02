import React from "react";

const SignUpValidation = (values) => {
  let errors = {};

  if (!values.firstName) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName) {
    errors.lastName = "Last name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\s+@\s+\.\s+/.test(values.email)) {
    errors.email = "Enter valid email";
  }

  if (!values.number) {
    errors.number = "Mobile number is required";
  } else if (values.number.length !== 10) {
    errors.number = "Enter valid mobile number";
  } else if (typeof values.number !== "number") {
    errors.number = "Enter valid mobile number";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 5) {
    errors.password = "Enter atleast 5 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Password  is required";
  } else if (values.confirmPassword.length < 5) {
    errors.confirmPassword = "Enter atleast 5 characters";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords didn't match";
  }

  return errors;
};

export default SignUpValidation;
