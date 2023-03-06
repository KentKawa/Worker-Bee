import React, {
  useState,
  useRef,
  FormEventHandler,
  ChangeEventHandler,
} from "react";
import { User } from "../Map/mapInterface";
//COMPONENTS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MapDynamic from "../Map/MapDynamicNoSSR";
import Image from "next/image";
//STYLE
import style from "./HiveForm.module.css";
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

const HiveForm: React.FC<User> = ({ hives, _id }) => {
  const [hiveCity, setHiveCity] = useState(""),
    [hiveName, setHiveName] = useState(""),
    [weight, setWeight] = useState<number>(),
    [queenPlaced, setQueenPlaced] = useState(""),
    [temperament, setTemperament] = useState(5),
    [medicine, setMedicine] = useState<string[]>([]),
    [disease, setDisease] = useState<string[]>([]);
  const location = useRef<[number, number]>([0, 0]);

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
      setMedicine([...medicine, e.currentTarget.id]);
    } else {
      let index = medicine.indexOf(e.currentTarget.id);
      let tempArray = [...medicine];
      tempArray.splice(index, 1);
      setMedicine(tempArray);
    }
  };

  const checkboxDiseaseHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.checked) {
      setDisease([...disease, e.currentTarget.id]);
    } else {
      let index = disease.indexOf(e.currentTarget.id);
      let tempArray = [...disease];
      tempArray.splice(index, 1);
      setDisease(tempArray);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(
      hiveName,
      weight,
      queenPlaced,
      temperament,
      location.current,
      medicine,
      disease
    );
    // const response = fetch(`CHANGE ME TO RIGHT API`, {
    //   hiveName,
    //   weight,
    //   queenPlaced,
    //   location: location.current,
    //   temperament,
    //   medicine,
    //   disease,
    // });
    // setHiveName("");
    // setWeight(0);
    // setQueenPlaced("");
    // setTemperament(5);
    // setMedicine([""]);
    // setDisease([""]);
    // location.current = [];
  };

  return (
    <div className={style.formContainer}>
      <Form onSubmit={onSubmit}>
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
            <Image src={Weight} alt="honey" height={20} /> Weight
          </Form.Label>
          <Form.Control
            onChange={(e) => setWeight(Number(e.target.value))}
            value={weight}
            type="number"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <Image src={Crown} alt="honey" height={20} /> Date of Queen
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
        <Form.Group>
          <Form.Label>
            <Image src={Pin} alt="honey" height={20} /> Location
          </Form.Label>
          <div style={{ height: "200px" }}>
            <MapDynamic location={location} />
          </div>
        </Form.Group>
        <div className={style.checkboxContainer}>
          <Form.Group>
            <Form.Label>
              <Image src={Meds} alt="honey" height={20} /> Medicine
            </Form.Label>
            <Form.Check
              onChange={checkboxMedsHandler}
              type="checkbox"
              id={"mites+"}
              label={"mites+"}
            />
            <Form.Check
              onChange={checkboxMedsHandler}
              type="checkbox"
              id={"foulBrood+"}
              label={"foul brood+"}
            />
            <Form.Check
              onChange={checkboxMedsHandler}
              type="checkbox"
              id={"nosema+"}
              label={"nosma+"}
            />
            <Form.Check
              onChange={checkboxMedsHandler}
              type="checkbox"
              id={"beetle+"}
              label={"beetle+"}
            />
            <Form.Check
              onChange={checkboxMedsHandler}
              type="checkbox"
              id={"moth+"}
              label={"moth+"}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <Image src={Disease} alt="honey" height={20} /> Disease
            </Form.Label>
            <Form.Check
              onChange={checkboxDiseaseHandler}
              type="checkbox"
              id={"varroaMite"}
              label={"varroa mite"}
            />
            <Form.Check
              onChange={checkboxDiseaseHandler}
              type="checkbox"
              id={"trachealMite"}
              label={"tracheal mite"}
            />
            <Form.Check
              onChange={checkboxDiseaseHandler}
              type="checkbox"
              id={"nosema"}
              label={"nosema"}
            />
            <Form.Check
              onChange={checkboxDiseaseHandler}
              type="checkbox"
              id={"sacbrood"}
              label={"sacbrood"}
            />
            <Form.Check
              onChange={checkboxDiseaseHandler}
              type="checkbox"
              id={"chalkbrood"}
              label={"chalkbrood"}
            />
            <Form.Check
              onChange={checkboxDiseaseHandler}
              type="checkbox"
              id={"foulbrood"}
              label={"foulbrood"}
            />
          </Form.Group>
        </div>
        <div>
          <Button style={{ marginTop: "1em" }} variant="dark" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default HiveForm;
