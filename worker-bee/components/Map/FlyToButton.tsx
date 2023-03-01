const FlyToButton = (props) => {
  const map = useMap();
  if (props.latlng.length > 0) {
    const clickHandler = () => map.flyTo(props.latlng, 15);
    return (
      <button
        style={{ opacity: "98%" }}
        className="btn btn-secondary border btn-sm"
        onClick={clickHandler}
      >
        {props.name}
      </button>
    );
  } else return;
};
