import { LeafletMouseEvent } from "leaflet";
import { useState, useRef, useMemo, useEffect } from "react";
import { useMapEvents, Marker } from "react-leaflet";
import BeeIcon from "./BeeIcon";
import { Ref } from "./mapInterface";

const DraggableMarker: React.FC<Ref> = ({ location }) => {
  const [position, setPosition] = useState(
    location
      ? { lat: location.current[0], lng: location.current[1] }
      : { lat: 0, lng: 0 }
  );
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (location !== null) {
      location.current = [position.lat, position.lng];
    }
  }, [position]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          console.log(marker.getLatLng());
          setPosition({
            lat: marker.getLatLng().lat,
            lng: marker.getLatLng().lng,
          });
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
