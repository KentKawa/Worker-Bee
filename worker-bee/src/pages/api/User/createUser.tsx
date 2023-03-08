import dbConnect from "services/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import UserSchema from "models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
        Pasadena: [],
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
}
