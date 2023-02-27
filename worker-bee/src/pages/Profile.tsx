import { NextPage } from "next";
import React from "react";
import { useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile: NextPage = (props): JSX.Element => {
  const session = useSession();
  console.log(session);
  return <div>Profile</div>;
};

export default Profile;
