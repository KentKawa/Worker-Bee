import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DraggableMarker from "./DraggableMarker";
import { Ref } from "./mapInterface";

const Map: React.FC<Ref> = ({ location }) => {
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
      <DraggableMarker location={location} />
    </MapContainer>
  );
};

export default Map;
