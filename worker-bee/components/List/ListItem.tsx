import React, { useState, useEffect } from "react";
import { User } from "components/Map/mapInterface";
//COMPONENTS
import EditHiveForm from "./EditHiveForm";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Image from "next/image";
//STYLE
import style from "./ListItem.module.css";
//ASSETS
import Weight from "../../public/form/weight-scale.png";
import Hive from "../../public/beehive.png";
import {
  AiFillCaretUp,
  AiFillCaretDown,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";

type ComponentState = {
  [key: string]: boolean;
};

const GetHiveLocationName: React.FC<User> = ({ hives, _id, setUser }) => {
  const [openApiary, setOpenApiary] = useState<ComponentState>({});

  const toggleOpenApiary = (apiaryNames: string) => {
    setOpenApiary((prev) => ({ ...prev, [apiaryNames]: !prev[apiaryNames] }));
  };

  useEffect(() => {
    if (hives) {
      const name = Object.keys(hives);
      name.map((ele) => {
        setOpenApiary({ ...openApiary, ele: true });
      });
    }
  }, [hives]);

  if (hives) {
    const name = Object.keys(hives);
    return (
      <>
        {name.map((key) => (
          <ListGroup as="ul" key={key} className={style.cityContainer}>
            <div
              onClick={() => toggleOpenApiary(key)}
              className={style.locationNameContainer}
            >
              <h3>{key}</h3>
              {openApiary[key] ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </div>
            <div
              style={
                openApiary[key] ? { display: "block" } : { display: "none" }
              }
            >
              {hives[key].length > 0
                ? hives[key].map((ele) => (
                    <>
                      <ListGroup.Item
                        variant="dark"
                        key={ele.hiveName}
                        className={style.listItem}
                      >
                        <div className={style.hiveNameContainer}>
                          <Image src={Hive} alt="bee hive" height={25} />
                          <h4>{ele.hiveName}</h4>
                          <Image src={Weight} alt="scale" height={25} />
                          <h4>{ele.weight}</h4>
                          <div className={style.buttonContainer}>
                            <Button variant="outline-secondary">
                              <AiFillEdit />
                            </Button>
                            <Button variant="outline-danger">
                              <AiFillDelete />
                            </Button>
                          </div>
                        </div>
                        <div>
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
                        </div>
                      </ListGroup.Item>
                      <EditHiveForm
                        hives={hives}
                        _id={_id}
                        setUser={setUser}
                        editHive={ele}
                        currentApiaryName={key}
                      />
                    </>
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
