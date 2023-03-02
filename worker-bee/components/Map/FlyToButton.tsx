import { useMap } from "react-leaflet";
import { Hive } from "./mapInterface";

const FlyToButton: React.FC<Hive> = ({ location, name }) => {
  const map = useMap();
  if (location.length > 0) {
    const clickHandler = () => map.flyTo(location, 15);
    return <button onClick={clickHandler}>{name}</button>;
  } else return null;
};

export default FlyToButton;
