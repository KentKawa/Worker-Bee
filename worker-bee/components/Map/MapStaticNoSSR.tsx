import React from "react";
import dynamic from "next/dynamic";
import { Location } from "./mapInterface";

const MapNoSSR = dynamic(() => import("./MapDynamic"), { ssr: false });

const MapDynamic: React.FC<Location> = ({ lat, lng }) => {
  return (
    <div style={{ height: "100%" }}>
      <MapNoSSR lat={lat} lng={lng} />
    </div>
  );
};

export default MapDynamic;
