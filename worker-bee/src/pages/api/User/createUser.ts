import dbConnect from "services/mongo";
import UserModel from "models/user.model";
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
      res.json(await UserModel.find({}));
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      await dbConnect();
      const check = await UserModel.findOne({ email: req.query.email });
      if (check) {
        res.status(400).json({ data: "invalid email" });
      }
      res.json(await UserModel.create(req.body).catch(catcher));
    },
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      await dbConnect();
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      await dbConnect();
    },
  };
}
