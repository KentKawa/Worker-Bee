import { LeafletMouseEvent } from "leaflet";
import { useState, useRef, useMemo } from "react";
import { useMapEvents, Marker } from "react-leaflet";
import BeeIcon from "./BeeIcon";
import { Hive } from "./mapInterface";

const DraggableMarker: React.FC<Hive> = ({ location }) => {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          console.log(marker);
          //   setPosition({lat: marker.getLatLng().lat, lng: marker.getLatLng().lng});
        }
      },
    }),
    []
  );
  useMapEvents({
    click(e: LeafletMouseEvent) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return (
    <Marker
      icon={BeeIcon}
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    ></Marker>
  );
};

export default DraggableMarker;
