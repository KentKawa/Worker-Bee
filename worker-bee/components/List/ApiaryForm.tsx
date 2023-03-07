import React, { useState, useEffect, FormEventHandler } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { User } from "../Map/mapInterface";
import style from "./HiveForm.module.css";

const ApiaryForm: React.FC<User> = ({ hives, _id, setUser }) => {
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
    const response = await axios
      .put(`http://localhost:3000/api/Hive/createApiary?_id=${_id}`, {
        apiaryName: apiaryName,
      })
      .then((res) => {
        if (setUser) {
          console.log("Apiary Update:", res);
          setUser((prev) => ({ ...prev, hives: res.data }));
          setApiaryName("");
        }
      })
      .catch((err) => {
        console.log("Apiary Error:", err);
      });
  };

  return (
    <div className={style.formContainer}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
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
