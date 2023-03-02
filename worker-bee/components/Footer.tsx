import React from "react";
import {
  BsInstagram,
  BsTwitter,
  BsFacebook,
  BsFillTelephoneFill,
} from "react-icons/bs";
import style from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <div className={style.footer}>
      <h3>Contact</h3>
      <hr />
      <div>
        <BsInstagram /> @HiveHelper
      </div>
      <div>
        <BsTwitter />
        @HiveHelper
      </div>
      <div>
        <BsFacebook /> HiveHelper
      </div>
      <div>
        <BsFillTelephoneFill />
        1(800)-696-6969
      </div>
    </div>
  );
};

export default Footer;
