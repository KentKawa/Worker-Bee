import React from "react";
//COMPONENTS
import HomeNavbar from "components/HomeNavbar";
import Link from "next/link";
//STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../styles/NewUser.module.css";

const NewUserLogin = () => {
  return (
    <div className={style.page}>
      <HomeNavbar />
      <div className={style.success}>
        <h3>Sign up successful!</h3>
        <p>
          <Link href="/Login">Login</Link> to continue
        </p>
      </div>
    </div>
  );
};

export default NewUserLogin;
