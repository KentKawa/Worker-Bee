import { NextPage } from "next";
import React from "react";
//COMPONENTS
import HomeNavbar from "components/HomeNavbar";

import Footer from "components/Footer";
//STYLES
import "bootstrap/dist/css/bootstrap.min.css";

const Contact: NextPage = (): JSX.Element => {
  return (
    <div>
      <HomeNavbar />
      <hr />
      <Footer />
    </div>
  );
};

export default Contact;
