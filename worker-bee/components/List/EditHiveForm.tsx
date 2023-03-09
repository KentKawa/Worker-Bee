import React, {
  useState,
  useRef,
  FormEventHandler,
  ChangeEventHandler,
  useEffect,
} from "react";
import { User } from "../Map/mapInterface";
import axios from "axios";
//COMPONENTS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import MapDynamic from "../Map/MapDynamicNoSSR";
import Image from "next/image";
//STYLE
import style from "./EditHiveForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
//ASSETS
import Honey from "../../public/honey.png";
import Weight from "../../public/form/weight-scale.png";
import Crown from "../../public/form/crown.png";
import SadFace from "../../public/form/sad-face.png";
import NeutralFace from "../../public/form/neutral-face.png";
import HappyFace from "../../public/form/happy-face.png";
import Pin from "../../public/map-location-svgrepo-com.png";
import Meds from "../../public/form/meds.png";
import Disease from "../../public/form/disease.png";

interface Hive {
  _id: string;
  hiveName: string;
  weight: number;
  queenPlaced: string;
  temperament: number;
  medicine: string[];
  disease: string[];
  location: [number, number];
}
interface editHive {
  editHive?: Hive;
}
interface apiaryName {
  currentApiaryName?: string;
}

interface editForm extends User, editHive, apiaryName {}

const EditHiveForm: React.FC<editForm> = ({
  hives,
  _id,
  setUser,
  editHive,
  currentApiaryName,
}) => {
  const [apiaryName, setApiaryName] = useState(
      currentApiaryName ? currentApiaryName : "Select an Apiary"
    ),
    [hiveName, setHiveName] = useState(editHive ? editHive.hiveName : ""),
    [weight, setWeight] = useState(editHive ? editHive.weight : 0),
    [queenPlaced, setQueenPlaced] = useState(
      editHive ? editHive.queenPlaced : ""
    ),
    [temperament, setTemperament] = useState(
      editHive ? editHive.temperament : 5
    ),
    [medicine, setMedicine] = useState<string[]>(
      editHive ? editHive.medicine : []
    ),
    [disease, setDisease] = useState<string[]>(
      editHive ? editHive.disease : []
    ),
    [openMap, setOpenMap] = useState(false),
    [openChecks, setOpenChecks] = useState(false);
  const location = useRef<[number, number]>(
    editHive ? editHive.location : [0, 0]
  );
  const hive_id = editHive ? editHive._id : "";

  useEffect(() => {
    if (editHive) {
      location.current = editHive.location;
    }
    console.log(editHive, apiaryName, hiveName, hive_id);
  }, []);

  let apiarys: string[] = [];
  if (hives) {
    apiarys = Object.keys(hives);
  }

  const temperamentName = () => {
    if (temperament <= 2) {
      return "Very-passive";
    } else if (temperament <= 4) {
      return "Passive";
    } else if (temperament <= 6) {
      return "Neutral";
    } else if (temperament <= 8) {
      return "Aggressive";
    } else {
      return "Very-aggressive";
    }
  };

  const checkboxMedsHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.checked) {
      setMedicine([...medicine, e.currentTarget.value]);
    } else {
      let index = medicine.indexOf(e.currentTarget.value);
      let tempArray = [...medicine];
      tempArray.splice(index, 1);
      setMedicine(tempArray);
    }
  };

  const checkboxDiseaseHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.checked) {
      setDisease([...disease, e.currentTarget.value]);
    } else {
      let index = disease.indexOf(e.currentTarget.value);
      let tempArray = [...disease];
      tempArray.splice(index, 1);
      setDisease(tempArray);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(
      apiaryName,
      hiveName,
      weight,
      queenPlaced,
      temperament,
      location.current,
      medicine,
      disease
    );

    const response = axios
      .put(`http://localhost:3000/api/Hive/updateHive?_id=${_id}`, {
        _id: hive_id,
        apiaryName,
        hiveName,
        weight,
        queenPlaced,
        location: location.current,
        temperament,
        medicine,
        disease,
      })
      .then((res) => {
        console.log(`Updated hive`, res.data.results.hives);
        if (setUser) {
          setUser((prev) => ({ ...prev, hives: res.data.results.hives }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style.formContainer}>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Apiary</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="light">{apiaryName}</Dropdown.Toggle>
            <Dropdown.Menu>
              {apiarys.map((ele) => {
                return (
                  <Dropdown.Item
                    onClick={() => setApiaryName(`${ele}`)}
                    key={ele}
                  >
                    {ele}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <Image src={Honey} alt="honey" height={20} /> Name
          </Form.Label>
          <Form.Control
            onChange={(e) => setHiveName(e.target.value)}
            value={hiveName}
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <Image src={Weight} alt="weight" height={20} /> Weight
          </Form.Label>
          <Form.Control
            onChange={(e) => setWeight(Number(e.target.value))}
            value={weight}
            type="number"
          />
        </Form.Group>
        <Form.Group style={{ display: "flex", flexDirection: "column" }}>
          <Form.Label>
            <Image src={Crown} alt="crown" height={20} /> Date of Queen
            placement
          </Form.Label>
          <input
            onChange={(e) => setQueenPlaced(e.target.value)}
            className="rounded"
            value={queenPlaced}
            type="date"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Temperament</Form.Label>
          <Form.Range
            onChange={(e) => setTemperament(Number(e.target.value))}
            min={0}
            max={10}
            step={1}
            value={temperament}
          />
          <div className={style.temperamentBar}>
            <Image src={HappyFace} alt="honey" height={20} />{" "}
            <Image src={NeutralFace} alt="honey" height={20} />{" "}
            <Image src={SadFace} alt="honey" height={20} />{" "}
          </div>
          <p style={{ fontStyle: "italic" }}>{temperamentName()}</p>
        </Form.Group>
        <Form.Group
          onClick={() => setOpenMap(!openMap)}
          style={
            openMap
              ? {
                  backgroundColor: "white",
                  borderRadius: ".5em .5em 0 0",
                }
              : {
                  backgroundColor: "white",
                  borderRadius: ".5em ",
                }
          }
        >
          <Form.Label>
            <Image src={Pin} alt="map pin" height={20} /> Location
          </Form.Label>
        </Form.Group>
        {openMap ? (
          <div style={{ height: "200px" }}>
            <MapDynamic location={location} />
          </div>
        ) : (
          <div></div>
        )}
        <div
          onClick={() => setOpenChecks(!openChecks)}
          style={{ backgroundColor: "#838385", borderRadius: ".5em" }}
        >
          <label>Meds/Disease</label>{" "}
        </div>
        {openChecks ? (
          <div className={style.checkboxContainer}>
            <Form.Group>
              <Form.Label>
                <Image src={Meds} alt="medicine" height={20} /> Medicine
              </Form.Label>
              <Form.Check
                onChange={checkboxMedsHandler}
                type="checkbox"
                value={"mites+"}
                label={"mites+"}
                checked={medicine.includes("mites+") ? true : false}
              />
              <Form.Check
                onChange={checkboxMedsHandler}
                type="checkbox"
                value={"foulBrood+"}
                label={"foul brood+"}
                checked={medicine.includes("foulBrood+") ? true : false}
              />
              <Form.Check
                onChange={checkboxMedsHandler}
                type="checkbox"
                value={"nosema+"}
                label={"nosma+"}
                checked={medicine.includes("nosema+") ? true : false}
              />
              <Form.Check
                onChange={checkboxMedsHandler}
                type="checkbox"
                value={"beetle+"}
                label={"beetle+"}
                checked={medicine.includes("beetle+") ? true : false}
              />
              <Form.Check
                onChange={checkboxMedsHandler}
                type="checkbox"
                value={"moth+"}
                label={"moth+"}
                checked={medicine.includes("moth+") ? true : false}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <Image src={Disease} alt="disease" height={20} /> Disease
              </Form.Label>
              <Form.Check
                onChange={checkboxDiseaseHandler}
                type="checkbox"
                value={"varroaMite"}
                label={"varroa mite"}
                checked={disease.includes("varroaMite") ? true : false}
              />
              <Form.Check
                onChange={checkboxDiseaseHandler}
                type="checkbox"
                value={"trachealMite"}
                label={"tracheal mite"}
                checked={disease.includes("trachealMite") ? true : false}
              />
              <Form.Check
                onChange={checkboxDiseaseHandler}
                type="checkbox"
                value={"nosema"}
                label={"nosema"}
                checked={disease.includes("nosema") ? true : false}
              />
              <Form.Check
                onChange={checkboxDiseaseHandler}
                type="checkbox"
                value={"sacbrood"}
                label={"sacbrood"}
                checked={disease.includes("sacbrood") ? true : false}
              />
              <Form.Check
                onChange={checkboxDiseaseHandler}
                type="checkbox"
                value={"chalkbrood"}
                label={"chalkbrood"}
                checked={disease.includes("chalkbrood") ? true : false}
              />
              <Form.Check
                onChange={checkboxDiseaseHandler}
                type="checkbox"
                value={"foulbrood"}
                label={"foulbrood"}
                checked={disease.includes("foulbrood") ? true : false}
              />
            </Form.Group>
          </div>
        ) : (
          <div></div>
        )}

        <div>
          <Button style={{ marginTop: "1em" }} variant="dark" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditHiveForm;
