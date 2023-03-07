import dbConnect from "services/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import UserSchema from "models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const response = await UserSchema.findByIdAndUpdate(
    req.query._id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    },
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ err });
      } else {
        console.log("Updated User:", results);
        return res.status(200).json({ results });
      }
    }
  );
  if (!response) {
    return res.status(400).end();
  }
}
