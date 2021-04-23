import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongo";
import { ObjectId } from "mongodb";

const Joi = require("joi");

const schema = Joi.object({
  temp: Joi.number().min(90).max(110).required(),
  oxygen: Joi.number().min(0).max(100).required(),
  smell: Joi.boolean().required(),
  taste: Joi.boolean().required(),
});

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Method not supported." });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const { data } = req.body;
    const { error, _ } = schema.validate(data);
    if (error) {
      return res.status(400).json({ message: "Invalid Data" });
    }
    console.log("Adding Record");
    const { db } = await connectToDatabase();
    const result = await db.collection("records").insertOne({
      user_id: ObjectId(session.user.uid),
      createdAt: new Date(),
      ...data,
    });

    return res.status(200).json({ message: "Record added successfully." });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Internal Server Error." });
  }
};

export default handler;
