import { User } from "./mapInterface";
import FlyToButton from "./FlyToButton";
import Dropdown from "react-bootstrap/Dropdown";
import style from "./FlyToList.module.css";
import { useEffect, useState } from "react";
import L from "leaflet";

const FlyToList: React.FC<User> = ({ hives }) => {
  const [apiaryName, setApiaryName] = useState("Choose an Apiary");

  useEffect(() => {
    const element = document.getElementById("flyToList");

    if (element) {
      L.DomEvent.disableScrollPropagation(element);
    }
  }, []);

  if (hives) {
    const name = Object.keys(hives);
    console.log(hives[apiaryName]);
    return (
      <div id="flyToList" className={style.flyToList}>
        <Dropdown className={style.dropdownButton}>
          <Dropdown.Toggle variant="dark">{apiaryName}</Dropdown.Toggle>
          <Dropdown.Menu>
            {name.map((key) => {
              return (
                <Dropdown.Item
                  key={key}
                  onClick={() => setApiaryName(`${key}`)}
                >
                  {key}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        {hives[apiaryName] ? (
          <div className={style.flyToContainer}>
            {hives[apiaryName].map((ele) => {
              return (
                <div key={ele.hiveName}>
                  <FlyToButton
                    location={ele.location}
                    hiveName={ele.hiveName}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default FlyToList;
