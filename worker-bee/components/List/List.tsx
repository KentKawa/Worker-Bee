import React, { useState } from "react";
//COMPONENTS
import Image from "next/image";
import HiveForm from "./HiveForm";
//STYLES
import style from "./List.module.css";
//ASSETS
import plusCircle from "../../public/form/plus-circle.png";

const List: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const handleFormOpen = () => {
    setFormOpen(!formOpen);
    console.log("click");
  };
  return (
    <div className={style.list}>
      {formOpen ? <HiveForm /> : <div></div>}
      {}
      <button
        onClick={handleFormOpen}
        className={
          formOpen
            ? `${style.formOpen} ${style.open}`
            : `${style.formOpen} ${style.close}`
        }
      >
        <Image
          src={plusCircle}
          alt={formOpen ? "X to close" : "+ to open"}
          height={50}
          width={50}
        />
      </button>
    </div>
  );
};

export default List;
