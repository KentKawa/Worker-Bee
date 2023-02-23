import React from "react";
import HomeNavbar from "components/HomeNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeCarousel from "components/HomeCarousel";
import home from "../styles/Home.module.css";

export default function Home() {
  return (
    <div id="Home" className={home.home}>
      <HomeNavbar />
      <HomeCarousel />
    </div>
  );
}
