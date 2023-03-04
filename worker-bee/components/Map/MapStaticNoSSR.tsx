import React from "react";
import dynamic from "next/dynamic";
import { User } from "./mapInterface";

const MapNoSSR = dynamic(() => import("./MapStatic"), { ssr: false });

const MapDynamic: React.FC<User> = ({ hives }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapNoSSR hives={hives} />
    </div>
  );
};

export default MapDynamic;
