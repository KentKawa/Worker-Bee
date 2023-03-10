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
  const hiveId = new ObjectId(req.body._id);
  const response = UserSchema.findOneAndUpdate(
    {
      _id: req.query._id,
    },
    { $pull: { [`hives.${req.body.apiaryName}`]: { _id: hiveId } } },
    { new: true }
  )
    .then((results) => {
      console.log(
        `Hive ${hiveId} was successfully deleted from ${req.body.apiaryName}`
      );
      res.status(200).json({ results });
    })
    .catch((err) => {
      console.log("Error while deleting hive", err);
      res.status(400).json({ err });
    });
}
