import React, { useState, useEffect, FormEventHandler } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { User } from "../Map/mapInterface";
import style from "./HiveForm.module.css";

const ApiaryForm: React.FC<User> = ({ hives, _id }) => {
  const [apiaryName, setApiaryName] = useState(""),
    [error, setError] = useState(false);

  useEffect(() => {
    if (hives) {
      if (apiaryName in hives) {
        return setError(true);
      }
      setError(false);
    }
  }, [apiaryName, hives]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // const response = await fetch(
    //   `http://localhost:3000/api/User/userServices?_id=${_id}`,
    //   {
    //     method: "put",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(apiaryName),
    //   }
    // );
    console.log("DOES THIS EVEN RUN");
  };

  return (
    <div className={style.formContainer}>
      <Form>
        <Form.Group onSubmit={handleSubmit}>
          <Form.Label>Apiary</Form.Label>
          <Form.Control
            onChange={(e) => setApiaryName(e.target.value)}
            value={apiaryName}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <p className={style.error}>
          {error ? "Apiary names cannot be the same" : null}
        </p>
        <Button
          disabled={error ? true : false}
          style={{ marginTop: "1em" }}
          variant="dark"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ApiaryForm;
