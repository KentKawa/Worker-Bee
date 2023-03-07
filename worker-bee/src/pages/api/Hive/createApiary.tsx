import dbConnect from "services/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import UserSchema from "models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const options = { new: true, setDefaultsOnInsert: true, upsert: true };
  const response = UserSchema.findByIdAndUpdate(
    req.query._id,
    {
      $set: {
        [`hives.${req.body.apiaryName}`]: [],
      },
    },
    options,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        console.log("Updated Apiary:", results);
        return res.status(200).json(results.hives);
      }
    }
  );
}
