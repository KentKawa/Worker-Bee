import React, { useState } from "react";
import { User } from "components/Map/mapInterface";
//COMPONENTS
import Image from "next/image";
import HiveForm from "./HiveForm";
import ApiaryForm from "./ApiaryForm";
//STYLES
import style from "./List.module.css";
//ASSETS
import plusCircle from "../../public/form/plus-circle.png";
import ListItem from "./ListItem";

const List: React.FC<User> = ({ hives, _id, setUser }) => {
  const [formOpen, setFormOpen] = useState(false),
    [apiaryOpen, setApiaryOpen] = useState(false);

  const handleFormOpen = (form: string) => {
    if (form === "apiary") {
      setApiaryOpen(!apiaryOpen);
    } else {
      setFormOpen(!formOpen);
    }
  };

  return (
    <div className={style.list}>
      {formOpen ? (
        <HiveForm hives={hives} _id={_id} setUser={setUser} />
      ) : (
        <div></div>
      )}
      {apiaryOpen ? (
        <ApiaryForm hives={hives} _id={_id} setUser={setUser} />
      ) : (
        <div></div>
      )}
      <div className={style.listContainer}>
        <ListItem hives={hives} _id={_id} setUser={setUser} />
      </div>

      <button
        onClick={() => handleFormOpen("apiary")}
        className={
          apiaryOpen
            ? `${style.apiaryOpen} ${style.open}`
            : `${style.apiaryOpen} ${style.close}`
        }
      >
        <Image
          src={plusCircle}
          alt={formOpen ? "X to close" : "+ to open"}
          height={50}
          width={50}
        />
      </button>
      <button
        onClick={() => handleFormOpen("hive")}
        className={
          formOpen
            ? `${style.formOpen} ${style.open}`
            : `${style.formOpen} ${style.close}`
        }
      >
        <Image
          src={plusCircle}
          alt={formOpen ? "X to close" : "+ to open"}
          height={40}
          width={40}
        />
      </button>
    </div>
  );
};

export default List;
