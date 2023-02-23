import React from "react";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import flower from "../public/pexelsKatSmithBee.jpg";
import bee from "../public/pexelsLukasBee.jpg";
import honey from "../public/pexelsAneteLusinaBeeKeep.jpg";
import style from "./HomeCarousel.module.css";

const HomeCarousel: React.FC = () => {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <Image
          className="d-block w-100"
          src={flower}
          alt="Bee on a flower"
          width={1080}
          height={440}
        />
        <Carousel.Caption className={style.textContainer}>
          <h3 className={style.title}>Hive Health</h3>
          <p className={style.body}>Give your bees a helping hand</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={bee}
          alt="Bee flying to flower"
          width={1080}
          height={440}
        />
        <Carousel.Caption className={style.textContainer}>
          <h3 className={style.title}>Location</h3>
          <p className={style.body}>
            Keep track of your hives location and wild hives
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={honey}
          alt="Bees on honeycomb"
          width={1080}
          height={440}
        />
        <Carousel.Caption className={style.textContainer}>
          <h3 className={style.title}>Care</h3>
          <p className={style.body}>
            Take better care of your hives with better tracking
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
