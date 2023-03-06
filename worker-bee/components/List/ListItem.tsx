import React, { useState } from "react";
import { User } from "components/Map/mapInterface";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Image from "next/image";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import style from "./ListItem.module.css";
import Weight from "../../public/form/weight-scale.png";
import Hive from "../../public/beehive.png";

const GetHiveLocationName: React.FC<User> = ({ hives }) => {
  const [open, setOpen] = useState<boolean>(false);
  if (hives) {
    const name = Object.keys(hives);
    return (
      <>
        {name.map((key) => (
          <ListGroup as="ul" key={key} className={style.cityContainer}>
            <div
              onClick={() => setOpen(!open)}
              className={style.locationNameContainer}
            >
              <h3>{key}</h3>
              {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </div>
            <div style={open ? { display: "block" } : { display: "none" }}>
              {hives[key].length > 0
                ? hives[key].map((ele) => (
                    <ListGroup.Item
                      variant="dark"
                      key={ele.name}
                      className={style.listItem}
                    >
                      <div className={style.hiveNameContainer}>
                        <Image src={Hive} alt="bee hive" height={25} />
                        <h4>{ele.name}</h4>
                        <Image src={Weight} alt="scale" height={25} />
                        <h4>{ele.weight}</h4>
                      </div>
                      {ele.medicine.map((med) => (
                        <Badge bg="secondary" pill key={med}>
                          {med}
                        </Badge>
                      ))}
                      {ele.disease.map((dis) => (
                        <Badge bg="dark" pill key={dis}>
                          {dis}
                        </Badge>
                      ))}
                    </ListGroup.Item>
                  ))
                : null}
            </div>
          </ListGroup>
        ))}
      </>
    );
  } else {
    return null;
  }
};

export default GetHiveLocationName;
