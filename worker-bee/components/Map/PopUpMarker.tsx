import BeeIcon from "./BeeIcon";
import { Hive } from "./mapInterface";
import { Marker, Popup } from "react-leaflet";

const PopupMarkers: React.FC<Hive> = ({ name, location, weight }) => {
  if (location.length > 0) {
    return (
      <Marker title={name} icon={BeeIcon} position={location}>
        <Popup>
          {name} WT:{weight}
        </Popup>
      </Marker>
    );
  } else return null;
};
