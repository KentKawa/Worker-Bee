import React from "react";
import dynamic from "next/dynamic";
import { Hive } from "./mapInterface";

const MapNoSSR = dynamic(() => import("./MapDynamic"), { ssr: false });

const MapDynamic: React.FC<Hive> = ({ location }, ref) => {
  return (
    <div style={{ height: "100%" }}>
      <MapNoSSR
        location={location}
        name={""}
        weight={0}
        queenPlaced={""}
        temperament={0}
        medicine={[]}
        disease={[]}
      />
    </div>
  );
};

export default MapDynamic;
