import React, { useEffect, useRef } from "react";
import { User } from "./mapInterface";
import L from "leaflet";
//COMPONENTS
import { MapContainer, TileLayer } from "react-leaflet";
import PopupMarkers from "./PopUpMarkers";
import FlyToList from "./FlyToList";
//STYLES
import "leaflet/dist/leaflet.css";

const Map: React.FC<User> = ({ hives }) => {
  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={{ lat: 35.6762, lng: 139.6503 }}
      minZoom={3}
      zoom={18}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors<br/><a href="https://www.flaticon.com/free-icons/bee" title="bee icons">Bee icons created by Freepik - Flaticon</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <FlyToList hives={hives} />
      </div>
      <PopupMarkers hives={hives} />
    </MapContainer>
  );
};

export default Map;
