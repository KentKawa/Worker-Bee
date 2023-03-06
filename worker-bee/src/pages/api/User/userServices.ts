import dbConnect from "services/mongo";
import UserSchema from "models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseFuncs } from "services/mongo.type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
  const catcher = (error: Error) => res.status(400).json({ error });

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      await dbConnect();
      const response = await UserSchema.find(
        { email: req.query.email },
        { _id: 1, username: 1, hives: 1, schedule: 1 }
      );
      if (response) {
        return res.status(200).json({ response });
      } else {
        return res.status(400).end();
      }
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      await dbConnect();
      const response = await UserSchema.findOne({ email: req.body.email });
      if (response) {
        return res.status(400).json({ data: "Invalid email" });
      } else {
        const user = new UserSchema({
          firstName: req.body.firstName,
          lastName: "",
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          hives: {
            Pasadena: [
              {
                name: "hive1",
                weight: 100,
                queenPlaced: "03-03-2023",
                temperament: 5,
                medicine: ["med1", "med2"],
                disease: ["disease1", "disease2"],
                location: [0, 0],
              },
              {
                name: "hive2",
                weight: 100,
                queenPlaced: "03-04-2023",
                temperament: 5,
                medicine: ["med1", "med2"],
                disease: ["disease1", "disease2"],
                location: [0, 0],
              },
              {
                name: "hive3",
                weight: 100,
                queenPlaced: "03-05-2023",
                temperament: 5,
                medicine: ["med1", "med2"],
                disease: ["disease1", "disease2"],
                location: [0, 0],
              },
            ],
          },
          schedule: {
            hive1: { meds: "03-03-2023" },
            hive2: { meds: "03-04-2023" },
            hive3: { meds: "03-05-2023" },
          },
        });
        try {
          const result = await user.save();
          return res.status(200).json({ result });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: error });
        }
      }
    },
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      await dbConnect();
      console.log("PUT", req.body);
      const response = await UserSchema.findById({ _id: req.query._id });
      const options = { upsert: true, setDefaultsOnInsert: true, new: true };
      if (response) {
        console.log("PUT", response);
        await UserSchema.findOneAndUpdate(
          {
            _id: req.body._id,
          },
          {
            $set: { [`hives.${req.body.apiaryName}`]: [] },
          },
          options,
          (error, results) => {
            console.log(results);
          }
        );
        res.status(200).end();
      }
      res.status(400).end();
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      await dbConnect();
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No response for this request" });
}
