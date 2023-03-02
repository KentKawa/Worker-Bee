import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DraggableMarker from "./DraggableMarker";
import { Location } from "./mapInterface";

const Map: React.FC<Location> = ({ lat, lng }) => {
  return (
    <MapContainer
      style={{ height: "30em" }}
      center={{ lat: 35.6762, lng: 139.6503 }}
      minZoom={3}
      zoom={18}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors<br/><a href="https://www.flaticon.com/free-icons/bee" title="bee icons">Bee icons created by Freepik - Flaticon</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker lat={lat} lng={lng} />
    </MapContainer>
  );
};

export default Map;
