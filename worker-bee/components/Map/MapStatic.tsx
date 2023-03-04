import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { User } from "./mapInterface";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FlyToButton from "./FlyToButton";
import PopUpMarkers from "./PopUpMarkers";
import BeeIcon from "./BeeIcon";

const Map: React.FC<User> = ({ hives }) => {
  const getHiveNames = () => {
    if (hives) {
      const name = Object.keys(hives);
      for (let key of name) {
        return (
          <DropdownButton
            style={{ zIndex: 500, justifySelf: "right" }}
            title={key}
          >
            {hives[key].map((ele) => {
              return (
                <Dropdown.Item key={ele.name}>
                  <FlyToButton location={ele.location} name={ele.name} />
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        );
      }
    }
  };

  const placeMarkers = () => {
    if (hives) {
      const name = Object.keys(hives);
      for (let key of name) {
        return (
          <>
            {hives[key].map((ele) => {
              return (
                <Marker
                  key={`${ele.name}/${key}`}
                  title={ele.name}
                  icon={BeeIcon}
                  position={ele.location}
                >
                  <Popup>
                    <p>{ele.name}</p> <br />
                    <p>WT:{ele.weight}</p>
                  </Popup>
                </Marker>
              );
            })}
          </>
        );
      }
    }
  };

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
      {placeMarkers()}
      {getHiveNames()}
    </MapContainer>
  );
};

export default Map;
