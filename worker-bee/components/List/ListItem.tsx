import React, { useState, useEffect } from "react";
import { User } from "components/Map/mapInterface";
import axios from "axios";
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
  const [openApiary, setOpenApiary] = useState<ComponentState>({}),
    [openDeleteApiary, setOpenDeleteApiary] = useState<ComponentState>({}),
    [openEditHives, setOpenEditHives] = useState<ComponentState>({}),
    [openDeleteHives, setOpenDeleteHives] = useState<ComponentState>({});

  const toggleOpenApiary = (apiaryNames: string) => {
    setOpenApiary((prev) => ({ ...prev, [apiaryNames]: !prev[apiaryNames] }));
  };

  const toggleOpenDeleteApiary = (apiaryName: string) => {
    setOpenDeleteApiary((prev) => ({
      ...prev,
      [apiaryName]: !prev[apiaryName],
    }));
  };

  const toggleOpenEdit = (hiveId: string) => {
    setOpenEditHives((prev) => ({ ...prev, [hiveId]: !prev[hiveId] }));
  };

  const toggleOpenDeleteHive = (hiveId: string) => {
    setOpenDeleteHives((prev) => ({ ...prev, [hiveId]: !prev[hiveId] }));
  };

  const handleDeleteApiary = (apiary: string) => {
    const response = axios
      .put(`http://localhost:3000/api/Hive/deleteApiary?_id=${_id}`, {
        apiaryName: apiary,
      })
      .then((res) => {
        console.log(res);
        if (setUser) {
          setUser((prev) => ({ ...prev, hives: res.data.results.hives }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteHive = (
    hive: {
      _id: any;
      hiveName?: string;
      weight?: number;
      queenPlaced?: string;
      temperament?: number;
      medicine?: string[];
      disease?: string[];
      location?: [0, 0];
    },
    apiary: string
  ) => {
    console.log(hive, apiary);
    const response = axios
      .put(`http://localhost:3000/api/Hive/deleteHive?_id=${_id}`, {
        _id: hive._id,
        apiaryName: apiary,
      })
      .then((res) => {
        console.log(res);
        if (setUser) {
          setUser((prev) => ({ ...prev, hives: res.data.results.hives }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (hives) {
      const name = Object.keys(hives);
      name.map((apiary) => {
        setOpenApiary({ ...openApiary, apiary: false });
        setOpenDeleteApiary({ ...setOpenDeleteApiary, apiary: false });
        hives[apiary].map((hive) => {
          setOpenEditHives((prev) => ({ ...prev, [hive._id]: false }));
          setOpenDeleteHives((prev) => ({ ...prev, [hive._id]: false }));
        });
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
              <button onClick={() => toggleOpenDeleteApiary(key)}>
                <AiFillDelete />
              </button>
            </div>
            {openDeleteApiary[key] ? (
              <div className={style.deleteContainer}>
                <h4>Are you sure you would like to delete this apiary?</h4>
                <Button
                  variant="light"
                  onClick={() => {
                    toggleOpenDeleteApiary(key);
                    toggleOpenApiary(key);
                  }}
                >
                  Cancel
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteApiary(key)}
                >
                  DELETE
                </Button>
              </div>
            ) : (
              <div></div>
            )}
            <div
              style={
                openApiary[key] ? { display: "block" } : { display: "none" }
              }
            >
              {hives[key].length > 0
                ? hives[key].map((ele) => (
                    <div key={ele.hiveName}>
                      <ListGroup.Item variant="dark" className={style.listItem}>
                        <div className={style.hiveNameContainer}>
                          <Image src={Hive} alt="bee hive" height={25} />
                          <h4>{ele.hiveName}</h4>
                          <Image src={Weight} alt="scale" height={25} />
                          <h4>{ele.weight}</h4>
                          <div className={style.buttonContainer}>
                            <Button
                              variant="outline-secondary"
                              onClick={() => toggleOpenEdit(ele._id)}
                            >
                              <AiFillEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              onClick={() => toggleOpenDeleteHive(ele._id)}
                            >
                              <AiFillDelete />
                            </Button>
                          </div>
                        </div>
                        <div>
                          {ele.medicine?.map((med) => (
                            <Badge bg="secondary" pill key={med}>
                              {med}
                            </Badge>
                          ))}
                          {ele.disease?.map((dis) => (
                            <Badge bg="dark" pill key={dis}>
                              {dis}
                            </Badge>
                          ))}
                        </div>
                      </ListGroup.Item>
                      {openEditHives[ele._id] ? (
                        <EditHiveForm
                          hives={hives}
                          _id={_id}
                          setUser={setUser}
                          editHive={ele}
                          currentApiaryName={key}
                        />
                      ) : (
                        <div></div>
                      )}
                      {openDeleteHives[ele._id] ? (
                        <div className={style.deleteContainer}>
                          <h4>
                            Are you sure you would like to delete this hive?
                          </h4>
                          <Button
                            variant="light"
                            onClick={() => toggleOpenDeleteHive(ele._id)}
                          >
                            Cancel
                          </Button>{" "}
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteHive(ele, key)}
                          >
                            DELETE
                          </Button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
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
