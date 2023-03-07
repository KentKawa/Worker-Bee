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
    { [`hives.${req.body.apiaryName}.name`]: req.body.hiveName },
    {
      $set: {
        [`hives.${req.body.apiaryName}.$.hiveName`]: req.body.hiveName,
        [`hives.${req.body.apiaryName}.$.weight`]: req.body.weight,
        [`hives.${req.body.apiaryName}.$.queenPlaced`]: req.body.queenPlaced,
        [`hives.${req.body.apiaryName}.$.location`]: req.body.location,
        [`hives.${req.body.apiaryName}.$.temperament`]: req.body.temperament,
        [`hives.${req.body.apiaryName}.$.medicine`]: req.body.medicine,
        [`hives.${req.body.apiaryName}.$.disease`]: req.body.disease,
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
