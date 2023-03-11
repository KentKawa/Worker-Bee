import BeeIcon from "./BeeIcon";
import { User } from "./mapInterface";
import { Marker, Popup } from "react-leaflet";

const PopupMarkers: React.FC<User> = ({ hives }) => {
  if (hives) {
    const name = Object.keys(hives);
    return (
      <>
        {name.map((key) => {
          return hives[key].map((ele) => {
            return (
              <Marker
                key={`${ele.hiveName}/${key}`}
                title={ele.hiveName}
                icon={BeeIcon}
                position={ele.location}
              >
                <Popup>
                  <h4>{ele.hiveName}</h4> <hr />
                  <p>WT: {ele.weight}</p>
                </Popup>
              </Marker>
            );
          });
        })}
      </>
    );
  }
  return null;
};

export default PopupMarkers;
