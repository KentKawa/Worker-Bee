import { NextPage } from "next";
import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
//COMPONENTS
import Loading from "../../components/Loading";
import HomeNavbar from "../../components/HomeNavbar";
//STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../styles/Profile.module.css";
//ASSETS

const Profile: NextPage = (props): JSX.Element => {
  const { data, status } = useSession();
  console.log(data, status);
  const router = useRouter();
  const { _id, username } = useMemo(() => {
    const response = fetch(
      `http://localhost:3000/api/User/userServices?email=${data?.user?.email}`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Login");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return (
      <div className={style.profile}>
        <HomeNavbar />
        <div>
          <div>
            <h3>
              {_id}
              {username}
            </h3>
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
