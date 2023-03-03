import React, { useState, FormEventHandler } from "react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
//COMPONENTS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import HomeNavbar from "components/HomeNavbar";
//STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../styles/Login.module.css";
import Loading from "components/Loading";

const SignIn: NextPage = (props): JSX.Element => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { data, status } = useSession();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      email: login.email,
      password: login.password,
      redirect: false,
    });
    if (response?.status === 200) {
      router.push("/Profile");
    } else {
      setError("Email or Password invalid");
    }
  };

  if (status === "authenticated") {
    router.push("/Profile");
  }
  if (status === "unauthenticated") {
    return (
      <div className={style.page}>
        <HomeNavbar />
        <Form onSubmit={handleSubmit} className={style.form}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={login.email}
              onChange={(e) =>
                setLogin({
                  ...login,
                  email: e.target.value.toLocaleLowerCase(),
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </Form.Group>
          <p className={style.error}>{error}</p>
          <Button
            variant="primary"
            type="submit"
            className={style.submitButton}
          >
            Submit
          </Button>
          <Link href="/NewUser" className={style.signUpButton}>
            Sign Up
          </Link>
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

export default SignIn;
