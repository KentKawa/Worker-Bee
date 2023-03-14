import { NextPage } from "next";
import React from "react";
//COMPONENTS
import HomeNavbar from "components/HomeNavbar";
import Image from "next/image";
import Footer from "components/Footer";
//STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../styles/About.module.css";
//ASSETS
import beeFlower from "../../public/pexelsKatSmithBee.jpg";

const About: NextPage = (): JSX.Element => {
  return (
    <div className={style.about}>
      <HomeNavbar />

      <div className={style.title}>
        <div className={style.imageContainer}>
          <div className={style.image}>
            <Image
              src={beeFlower}
              width={980}
              height={540}
              alt="bee on a flower"
            />
          </div>
        </div>
        <div className={style.textContainer}>
          <h2>ABOUT</h2>
          <hr />
          <p>
            &emsp;Welcome to our app - the ultimate tool for beekeepers looking
            to keep track of their hives! Our app lets you log the location,
            weight, queen dates, and medicine/disease treatments of your
            apiaries and hives, making it easy to monitor the health and
            progress of your bee colonies. Our app offers a wide range of
            features to simplify your beekeeping operations. You can set
            reminders for upcoming tasks such as hive inspections or treatments,
            and even generate detailed reports to help you make informed
            decisions and optimize your beekeeping practices. <br />
            <br />
            &emsp;Whether you're a hobbyist or a commercial beekeeper, our app
            is designed to streamline your workflow, save you time, and help you
            achieve the best possible results with your bee colonies. Sign up
            today and take the first step towards a healthier, more productive
            beekeeping operation!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
