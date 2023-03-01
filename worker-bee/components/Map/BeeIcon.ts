import L from "leaflet";

const BeeIcon = new L.Icon({
  iconUrl: "/bee.png",
  iconRetinaUrl: "/bee.png",
  iconAnchor: [20, 30],
  popupAnchor: [-1, -23],
  iconSize: new L.Point(35, 35),
});
export default BeeIcon;
