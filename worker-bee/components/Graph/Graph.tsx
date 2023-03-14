import React, { useEffect, useState } from "react";
import { User } from "../Map/mapInterface";
import { Chart as ChartJS, Colors } from "chart.js";
import "chart.js/auto";
//COMPONENTS
import { Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
//STYLE
import style from "./Graph.module.css";

const Graph: React.FC<User> = ({ hives }) => {
  const [labelsArray, setLabelsArray] = useState<string[]>([]);
  const [dataProp, setDataProp] = useState("");
  const [datasets, setDatasets] = useState<
    Array<{ label: string; data: any[] }>
  >([]);
  const apiaries = hives ? Object.keys(hives) : [];

  useEffect(() => {
    if (hives) {
      if (dataProp === "weight") {
        let nullCount = 1;
        const newDatasets = labelsArray.flatMap((apiary) => {
          let data = Array.from({ length: nullCount }, () => null);
          const datasets = hives[apiary].map((hive, index) => {
            console.log(
              `APIARY CHECK'${apiary}'`,
              `LOOKING INTO THIS HIVE ${hive.hiveName}`,
              `LOOKING AT THIS WEIGHT ${hive.weight}`
            );
            data[nullCount - 1] = hive?.weight;
            return {
              label: hive?.hiveName || "",
              data: [...data],
              backgroundColor:
                index % 2 === 0
                  ? "rgba(155, 155, 155, 0.75)"
                  : "rgba(230, 169, 3, 0.75)",
            };
          });
          console.log("NULL FILLED ARRAY", data);
          nullCount += 1;
          return datasets;
        });
        setDatasets(newDatasets);
      } else if (dataProp === "temperament") {
        let nullCount = 1;
        const newDatasets = labelsArray.flatMap((apiary) => {
          let data = Array.from({ length: nullCount }, () => null);
          const datasets = hives[apiary].map((hive, index) => {
            console.log(
              `APIARY CHECK'${apiary}'`,
              `LOOKING INTO THIS HIVE ${hive.hiveName}`,
              `LOOKING AT THIS TEMPERAMENT ${hive.temperament}`
            );
            data[nullCount - 1] = hive?.temperament;
            return {
              label: hive?.hiveName || "",
              data: [...data],
              backgroundColor:
                index % 2 === 0
                  ? "rgba(155, 155, 155, 0.75)"
                  : "rgba(230, 169, 3, 0.75)",
            };
          });
          console.log("NULL FILLED ARRAY", data);
          nullCount += 1;
          return datasets;
        });
        setDatasets(newDatasets);
      } else if (dataProp === "medicine") {
        let nullCount = 1;
        const newDatasets = labelsArray.flatMap((apiary) => {
          let data = Array.from({ length: nullCount }, () => null);
          const datasets = hives[apiary].map((hive, index) => {
            console.log(
              `APIARY CHECK'${apiary}'`,
              `LOOKING INTO THIS HIVE ${hive.hiveName}`,
              `LOOKING AT THIS MEDICINE ${hive.medicine}`
            );
            data[nullCount - 1] = hive?.medicine?.length;
            return {
              label: hive?.hiveName || "",
              data: [...data],
              backgroundColor:
                index % 2 === 0
                  ? "rgba(155, 155, 155, 0.75)"
                  : "rgba(230, 169, 3, 0.75)",
            };
          });
          console.log("NULL FILLED ARRAY", data);
          nullCount += 1;
          return datasets;
        });
        setDatasets(newDatasets);
      } else if (dataProp === "disease") {
        let nullCount = 1;
        const newDatasets = labelsArray.flatMap((apiary) => {
          let data = Array.from({ length: nullCount }, () => null);
          const datasets = hives[apiary].map((hive, index) => {
            console.log(
              `APIARY CHECK'${apiary}'`,
              `LOOKING INTO THIS HIVE ${hive.hiveName}`,
              `LOOKING AT THIS DISEASE ${hive.disease}`
            );
            data[nullCount - 1] = hive?.disease?.length;
            return {
              label: hive?.hiveName || "",
              data: [...data],
              backgroundColor:
                index % 2 === 0
                  ? "rgba(155, 155, 155, 0.75)"
                  : "rgba(230, 169, 3, 0.75)",
            };
          });
          console.log("NULL FILLED ARRAY", data);
          nullCount += 1;
          return datasets;
        });
        setDatasets(newDatasets);
      }
    }

    ChartJS.register(Colors);
  }, [labelsArray, dataProp, hives]);

  const options = {
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
    maintainAspectRation: false,
  };

  const labelHandler = (label: string) => {
    if (labelsArray?.includes(label)) {
      let index = labelsArray.indexOf(label);
      let tempArray = [...labelsArray];
      tempArray.splice(index, 1);
      setLabelsArray(tempArray);
    } else {
      setLabelsArray(labelsArray?.concat(label));
    }
  };

  console.log(labelsArray, datasets);
  return (
    <div className={style.graph}>
      <div className={style.buttonContainer}>
        <h3>APIARIES</h3>
        <div>
          {apiaries.map((apiary) => (
            <Button
              variant="light"
              onClick={() => labelHandler(apiary)}
              key={apiary}
            >
              {apiary}
            </Button>
          ))}
        </div>
      </div>
      <div className={style.graphContainer}>
        <Bar
          data={{
            labels: labelsArray,
            datasets: datasets,
          }}
          options={options}
        />
      </div>
      <div className={style.propsContainer}>
        <div className={style.radioContainer}>
          <div>
            <input
              type="radio"
              id="weight"
              name="dataset"
              value="weight"
              onChange={(e) => setDataProp(e.target.value)}
            />{" "}
            <label htmlFor="weight">Weight</label>
          </div>
          <div>
            <input
              type="radio"
              id="temperament"
              name="dataset"
              value="temperament"
              onChange={(e) => setDataProp(e.target.value)}
            />{" "}
            <label htmlFor="temperament">Temperament</label>
          </div>
          <div>
            <input
              type="radio"
              id="medicine"
              name="dataset"
              value="medicine"
              onChange={(e) => setDataProp(e.target.value)}
            />{" "}
            <label htmlFor="medicine">Medicine</label>
          </div>
          <div>
            <input
              type="radio"
              id="disease"
              name="dataset"
              value="disease"
              onChange={(e) => setDataProp(e.target.value)}
            />{" "}
            <label htmlFor="disease">Disease</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
