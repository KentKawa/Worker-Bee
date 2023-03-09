import dbConnect from "services/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import UserSchema from "models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const response = UserSchema.find(
    { email: req.query.email },
    { _id: 1, username: 1, hives: 1, schedule: 1 }
  )
    .then((results) => {
      res.status(200).json({ results });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err });
    });
}
