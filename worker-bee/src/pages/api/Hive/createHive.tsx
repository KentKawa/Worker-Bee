import dbConnect from "services/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import UserSchema from "models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const options = { new: true, setDefaultsOnInsert: true, upsert: true };
  const response = UserSchema.findOneAndUpdate(
    { _id: req.query._id },
    {
      $push: {
        [`hives.${req.body.apiaryName}`]: {
          hiveName: req.body.hiveName,
          weight: req.body.weight,
          queenPlaced: req.body.queenPlaced,
          location: req.body.location,
          temperament: req.body.temperament,
          medicine: req.body.medicine,
          disease: req.body.disease,
        },
      },
    },
    options,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        console.log("Updated Hives:", results);
        return res.status(200).json(results);
      }
    }
  );
}
