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
      const user = new UserModel({
        firstName: req.body.firstName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      try {
        user.save();
        return res.status(200).end();
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
      }
    },
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      await dbConnect();
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      await dbConnect();
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No response for this request" });
}
