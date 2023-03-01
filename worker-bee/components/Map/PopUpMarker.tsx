const PopupMarkers = (props) => {
  if (props.latlng.length > 0) {
    return (
      <Marker title={props.name} icon={beeIcon} position={props.latlng}>
        <Popup>
          {props.name} WT:{props.weight}
          <br />
          {props.temperament}
        </Popup>
      </Marker>
    );
  } else return;
};
