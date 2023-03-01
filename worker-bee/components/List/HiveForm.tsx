import React, {
  useState,
  useRef,
  FormEventHandler,
  ChangeEventHandler,
} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MapDynamic from "../Map/MapDynamic";
import "bootstrap/dist/css/bootstrap.min.css";

const HiveForm = () => {
  const [hiveName, setHiveName] = useState(""),
    [weight, setWeight] = useState(0),
    [queenPlaced, setQueenPlaced] = useState(""),
    [temperament, setTemperament] = useState(5),
    [medicine, setMedicine] = useState([""]),
    [disease, setDisease] = useState([""]);
  const location = useRef([]);

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
    // const response = fetch(`CHANGE ME TO RIGHT API`, {
    //   _id,
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
    // setMedicine([]);
    // setDisease([]);
    // location.current = [];
  };

  return (
    <div className="bg-secondary rounded p-3" style={{ height: "100%" }}>
      <Form className="row" onSubmit={onSubmit}>
        <Form.Group className="col-sm-6 mb-2">
          <Form.Label className="fw-bold text-dark">Name</Form.Label>
          <Form.Control
            onChange={(e) => setHiveName(e.target.value)}
            value={hiveName}
            type="text"
          />
        </Form.Group>
        <Form.Group className="col-sm-6 mb-2">
          <Form.Label className="fw-bold text-dark">Weight</Form.Label>
          <Form.Control
            onChange={(e) => setWeight(Number(e.target.value))}
            value={weight}
            type="number"
          />
        </Form.Group>
        <Form.Group className="row mx-auto col-sm-6 mb-2">
          <Form.Label className="fw-bold text-dark">
            Date of Queen placement
          </Form.Label>
          <input
            onChange={(e) => setQueenPlaced(e.target.value)}
            className="rounded"
            value={queenPlaced}
            type="date"
          />
        </Form.Group>
        <Form.Group className="col-sm-6 mb-2">
          <Form.Label className="fw-bold text-dark">Temperament</Form.Label>
          <Form.Range
            onChange={(e) => setTemperament(Number(e.target.value))}
            min={0}
            max={10}
            step={1}
            value={temperament}
          />
          <p className="my-0 fst-italic">{temperamentName()}</p>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="fw-bold text-dark">Location</Form.Label>
          <div style={{ height: "50vh" }}>
            <MapDynamic lat={0} lng={0} />
          </div>
        </Form.Group>
        <Form.Group className="col-sm-6 mb-2">
          <Form.Label className="fw-bold text-dark">Medicine</Form.Label>
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
        <Form.Group className="col-sm-6 mb-2">
          <Form.Label className="fw-bold text-dark">Disease</Form.Label>
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
          <Button className="btn btn-warning col-sm-3 m-2" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default HiveForm;