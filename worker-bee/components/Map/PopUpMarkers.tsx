import BeeIcon from "./BeeIcon";
import { User } from "./mapInterface";
import { Marker, Popup } from "react-leaflet";

const PopupMarkers: React.FC<User> = ({ hives }) => {
  if (hives) {
    const name = Object.keys(hives);
    for (let key of name) {
      hives[key].map((ele) => {
        return (
          <Marker
            key={`${ele.name}`}
            title={ele.name}
            icon={BeeIcon}
            position={[35.6762, 139.6503]}
          >
            <Popup>
              <h4>{ele.name}</h4> <br />
              <p>WT:{ele.weight}</p>
            </Popup>
          </Marker>
        );
      });
    }
  }
  return null;
};

export default PopupMarkers;
