import React from "react";
import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
//COMPONENTS
import HomeNavbar from "components/HomeNavbar";
import Footer from "components/Footer";
import Image from "next/image";
//STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import home from "../styles/Home.module.css";
//ASSETS
import locationIcon from "../../public/cityscape-of-buildings-svgrepo-com.png";
import signupIcon from "../../public/reservation-computer-svgrepo-com.png";
import clockIcon from "../../public/clock-svgrepo-com.png";
import pinIcon from "../../public/map-location-svgrepo-com.png";
import beekeeper from "../../public/pexelsAneteLusinaBeeKeep.jpg";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0.7,
    initialInView: true,
    triggerOnce: true,
  });

  if (status === "authenticated") {
    router.push("/Profile");
  }

  return (
    <div id="Home" className={home.home}>
      <div className={home.navbar}>
        <HomeNavbar />
      </div>
      <div className={home.titleContainer}>
        <div className={home.textContainer}>
          <h1>Hive Helper</h1>
          <p>Easily keep up to date on your hives.</p>
        </div>
        <div className={home.beekeeper}>
          <Image
            width={980}
            height={540}
            src={beekeeper}
            alt="beekeeper clip art"
          />
        </div>
      </div>{" "}
      <div className={home.cardContainer}>
        <div
          ref={ref}
          className={
            inView ? `${home.card} ${home.visible}` : `${home.notVisible}`
          }
        >
          <Image width={100} height={100} src={signupIcon} alt="laptop" />
          <h3>1.Sign up</h3>
          <p>Create an account to instantly gain access to all tools.</p>
        </div>
        <div
          className={
            inView ? `${home.card} ${home.visible}` : `${home.notVisible}`
          }
        >
          <Image
            src={pinIcon}
            alt="pin icon"
            width={25}
            height={25}
            className={home.pin}
          />
          <Image src={locationIcon} alt="city icon" width={150} height={150} />
          <h3>2.Log</h3>
          <p>
            Enter all of your hives, as well as any wild hives, location and
            information.
          </p>
        </div>
        <div
          className={
            inView ? `${home.card} ${home.visible}` : `${home.notVisible}`
          }
        >
          <Image width={100} height={100} src={clockIcon} alt="clock icon" />
          <h3>3.Schedule</h3>
          <p>
            Set up regular reminders for medication, queen replacement, harvest,
            and more.
          </p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
