import { useMap } from "react-leaflet";
import { User } from "./mapInterface";

interface FlyTo {
  location?: [number, number];
  hiveName?: string;
}

const FlyToButton: React.FC<FlyTo> = ({ location, hiveName }) => {
  const map = useMap();
  if (!location) {
    return null;
  }
  if (location.length > 0) {
    const clickHandler = () => map.flyTo(location, 18);
    return (
      <button
        className="btn btn-light btn-sm"
        style={{ width: "100%", color: "#303030" }}
        onClick={clickHandler}
      >
        {hiveName}
      </button>
    );
  } else return null;
};

export default FlyToButton;
