import { NextPage } from "next";
import React, { useState, FormEventHandler, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
//COMPONENTS
import HomeNavbar from "components/HomeNavbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//STYLES
import style from "../styles/NewUser.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "components/Loading";

const NewUser: NextPage = (): JSX.Element => {
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
    state: true,
  });
  const router = useRouter();
  const { data, status } = useSession();

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
      setError({ ...error, email: "Invalid email", state: true });
    } else if (password !== confirmPassword || !password) {
      setError({ ...error, password: "Passwords do not match", state: true });
    } else {
      setError(() => {
        return {
          firstName: "",
          username: "",
          email: "",
          password: "",
          state: false,
        };
      });
    }
    return error.state;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const check = validateForm(
      signUp.firstName,
      signUp.username,
      signUp.email,
      signUp.password,
      confirmPassword
    );
    if (check) {
      return;
    } else {
      const response = await axios
        .post(`http://localhost:3000/api/User/createUser`, {
          firstName: signUp.firstName,
          username: signUp.username,
          email: signUp.email,
          password: signUp.password,
        })
        .then((res) => {
          console.log("New User Response:", res);
          if (res.status === 200) {
            router.push("/NewUserLogin");
          }
        })
        .catch((err) => {
          console.log("New User Error:", err);
          if (err.response.status === 400) {
            setError({ ...error, email: "Invalid email", state: true });
            return;
          } else if (err.response.status === 500) {
            return;
          }
        });
    }
  };

  if (status === "authenticated") {
    router.push("/Profile");
  }
  if (status === "unauthenticated") {
    return (
      <div>
        <HomeNavbar />
        <Form onSubmit={handleSubmit} className={style.form}>
          <Form.Group className="mb-3">
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
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={signUp.username}
              onChange={(e) =>
                setSignUp({ ...signUp, username: e.target.value })
              }
            />
            <p className={style.error}>{error.username}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={signUp.email}
              onChange={(e) =>
                setSignUp({
                  ...signUp,
                  email: e.target.value.toLocaleLowerCase(),
                })
              }
            />{" "}
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
            <p className={style.error}>{error.email}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={signUp.password}
              onChange={(e) =>
                setSignUp({ ...signUp, password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className={style.error}>{error.password}</p>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className={style.submitButton}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
  return (
    <div>
      <HomeNavbar />
      <Loading />
    </div>
  );
};

export default NewUser;
