import React from "react";
//COMPONENTS
import Image from "next/image";
//STYLES
import "bootstrap/dist/css/bootstrap.min.css";
//ASSETS
import logo from "../public/honeyCombIcon.png";

const Loading: React.FC = () => {
  return (
    <div
      className="text-center justify-content-center align-items-center d-flex"
      style={{ height: "70vh" }}
    >
      <div className="loading">
        <Image src={logo} alt="logo" height={100} width={100} />
      </div>
      <h4 className="m-3 text-decoration-underline">Loading</h4>
    </div>
  );
};

export default Loading;
