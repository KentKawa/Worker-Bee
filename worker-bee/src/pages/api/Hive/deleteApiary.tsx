import dbConnect from "services/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import UserSchema from "models/user.model";
import { ObjectId } from "bson";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const response = UserSchema.findOneAndUpdate(
    {
      _id: req.query._id,
    },
    { $unset: { [`hives.${req.body.apiaryName}`]: "" } },
    { new: true }
  )
    .then((results) => {
      console.log(`Apiary ${req.body.apiaryName} was successfully deleted`);
      res.status(200).json({ results });
    })
    .catch((err) => {
      console.log("Error while deleting apiary", err);
      res.status(400).json({ err });
    });
}
