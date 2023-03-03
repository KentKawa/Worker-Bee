import { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
//COMPONENTS
import Loading from "../../components/Loading";
import HomeNavbar from "../../components/HomeNavbar";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Map from "../../components/Map/MapDynamicNoSSR";
import Graph from "../../components/Graph/Graph";
import List from "../../components/List/List";
//STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../styles/Profile.module.css";
//ASSETS
import hives from "../../public/beehive-honey.png";
import map from "../../public/map-location-svgrepo-com.png";
import graph from "../../public/bar-chart.png";

const Profile: NextPage = (): JSX.Element => {
  const [user, setUser] = useState({ _id: "", username: "" });
  const [pages, setPages] = useState({ hives: false, map: true, graph: false });
  const { data, status } = useSession();
  console.log(data, status);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Login");
    }
    if (status === "authenticated") {
      const profile = fetch(
        `http://localhost:3000/api/User/userServices?email=${data?.user?.email}`,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setUser({
            ...user,
            _id: res.response[0]._id,
            username: res.response[0].username,
          });
        });
    }
  }, [status]);

  const handleOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log(e.currentTarget.id);
    if (e.currentTarget.id === "hives") {
      setPages({ hives: true, map: false, graph: false });
    }
    if (e.currentTarget.id === "map") {
      setPages({ hives: false, map: true, graph: false });
    }
    if (e.currentTarget.id === "graph") {
      setPages({ hives: false, map: false, graph: true });
    }
  };

  if (status === "authenticated") {
    return (
      <div className={style.profile}>
        <HomeNavbar />
        <div>
          <div className={style.nameContainer}>
            <h3>{user.username}</h3>
          </div>
          <div className={style.buttonContainer}>
            <Button
              variant="light"
              className={style.button}
              onClick={handleOpen}
              id="hives"
            >
              <Image src={hives} alt="hives" height={30} width={30} />
            </Button>
            <Button
              variant="light"
              className={style.button}
              onClick={handleOpen}
              id="map"
            >
              <Image src={map} alt="map pin" height={30} width={30} />
            </Button>
            <Button
              variant="light"
              className={style.button}
              onClick={handleOpen}
              id="graph"
            >
              <Image src={graph} alt="graph" height={30} width={30} />
            </Button>
          </div>
          <div className={style.pageContainer}>
            <div className={style.pages}>
              {pages.map ? (
                <Map lat={0} lng={0} />
              ) : pages.hives ? (
                <List />
              ) : pages.graph ? (
                <Graph />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
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

export default Profile;
