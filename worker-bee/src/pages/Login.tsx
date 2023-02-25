import React, { useState, FormEventHandler } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../styles/Login.module.css";
import HomeNavbar from "components/HomeNavbar";

const SignIn: NextPage = (props): JSX.Element => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: login.email,
      password: login.password,
    });
    console.log(res);
  };

  return (
    <div className={style.page}>
      <HomeNavbar />
      <Form onSubmit={handleSubmit} className={style.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className={style.submitButton}>
          Submit
        </Button>
        <Link href="/NewUser" className={style.signUpButton}>
          Sign Up
        </Link>
      </Form>
    </div>
  );
};

export default SignIn;
