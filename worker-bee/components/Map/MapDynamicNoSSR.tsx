import React from "react";
import dynamic from "next/dynamic";
import { Ref } from "./mapInterface";

const MapNoSSR = dynamic(() => import("./MapDynamic"), { ssr: false });

const MapDynamic: React.FC<Ref> = ({ location }) => {
  return (
    <div style={{ height: "100%" }}>
      <MapNoSSR location={location} />
    </div>
  );
};

export default MapDynamic;
