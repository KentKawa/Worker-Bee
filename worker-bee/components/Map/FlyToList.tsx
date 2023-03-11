import { User } from "./mapInterface";
import FlyToButton from "./FlyToButton";
import Dropdown from "react-bootstrap/Dropdown";
import style from "./FlyToList.module.css";
import { useState } from "react";

const FlyToList: React.FC<User> = ({ hives }) => {
  const [apiaryName, setApiaryName] = useState("Choose an Apiary");

  if (hives) {
    const name = Object.keys(hives);
    console.log(hives[apiaryName]);
    return (
      <div className={style.flyToList}>
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
