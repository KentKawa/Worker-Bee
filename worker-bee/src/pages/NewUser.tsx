import { NextPage } from "next";
import React, { useState, FormEventHandler, useRef } from "react";
//COMPONENTS
import HomeNavbar from "components/HomeNavbar";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//STYLES
import style from "../styles/NewUser.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NewUser: NextPage = (props): JSX.Element => {
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    firstName: "",
    username: "",
    email: "",
    password: "",
    state: false,
  });

  const validateForm = (
    firstName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!firstName) {
      setError({ ...error, firstName: "First name required", state: true });
    } else if (!username) {
      setError({ ...error, username: "Username required", state: true });
    } else if (!/\S+@\S+\.\S+/.test(email) || !email) {
      setError({ ...error, email: "Enter valid email", state: true });
    } else if (password !== confirmPassword || !password || !confirmPassword) {
      setError({ ...error, password: "Passwords do not match", state: true });
    } else {
      setError({
        firstName: "",
        username: "",
        email: "",
        password: "",
        state: false,
      });
    }
    return error.state;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const check = await validateForm(
      signUp.firstName,
      signUp.username,
      signUp.email,
      signUp.password,
      confirmPassword
    );
    if (check) {
      return;
    } else {
      await fetch(`http://localhost:3000/api/User/createUser`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUp),
      });
    }
    console.log("here");
  };

  return (
    <div>
      <HomeNavbar />
      <Form onSubmit={handleSubmit} className={style.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={signUp.firstName}
            onChange={(e) =>
              setSignUp({ ...signUp, firstName: e.target.value })
            }
          />
          <p className={style.error}>{error.firstName}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={signUp.username}
            onChange={(e) => setSignUp({ ...signUp, username: e.target.value })}
          />
          <p className={style.error}>{error.username}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={signUp.email}
            onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
          />
          <p className={style.error}>{error.email}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={signUp.password}
            onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className={style.error}>{error.password}</p>
        </Form.Group>
        <Button variant="primary" type="submit" className={style.submitButton}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewUser;
