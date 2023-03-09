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
  const findId = UserSchema.findById(req.query._id)
    .then((user) => {
      const hive = user.hives.get(req.body.apiaryName);
      const hiveId = new ObjectId(req.body._id);
      const hiveIndex = hive.findIndex(
        (obj: { _id: { equals: (arg0: ObjectId) => any } }) =>
          obj._id.equals(hiveId)
      );
      if (hiveIndex >= 0) {
        const newHive = {
          _id: hiveId,
          hiveName: req.body.hiveName,
          weight: req.body.weight,
          queenPlaced: req.body.queenPlaced,
          temperament: req.body.temperament,
          medicine: req.body.medicine,
          disease: req.body.disease,
          location: req.body.location,
        };
        user.hives.set(req.body.apiaryName, [
          ...hive.slice(0, hiveIndex),
          newHive,
          ...hive.slice(hiveIndex + 1),
        ]);
        user
          .save()
          .then((results: any) => {
            console.log(
              `Updated Apiary ${req.body.apiaryName}: Hive ${hiveId}`
            );
            res.status(200).json({ results });
          })
          .catch((err: any) => {
            console.log(
              `Error updating Apiary ${req.body.apiaryName}: Hive ${hiveId}`,
              err
            );
            res.status(400).json({ err });
          });
      } else {
        console.log("OBJECT NOT FOUND");
        res.status(404).json({ data: "Object not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).end();
    });
}
