import React, {
  useState,
  useRef,
  FormEventHandler,
  ChangeEventHandler,
} from "react";
//COMPONENTS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MapDynamic from "../Map/MapDynamicNoSSR";
//STYLE
import style from "./HiveForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HiveForm = () => {
  const [hiveName, setHiveName] = useState(""),
    [weight, setWeight] = useState(0),
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setHiveName(e.target.value)}
            value={hiveName}
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Weight</Form.Label>
          <Form.Control
            onChange={(e) => setWeight(Number(e.target.value))}
            value={weight}
            type="number"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date of Queen placement</Form.Label>
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
          <p>{temperamentName()}</p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <div style={{ height: "200px" }}>
            <MapDynamic location={location} />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Medicine</Form.Label>
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
          <Form.Label>Disease</Form.Label>
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
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default HiveForm;
