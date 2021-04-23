import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongo";
import { ObjectId } from "mongodb";

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
    console.log("Adding Record");
    const { db } = await connectToDatabase();
    const result = await db
      .collection("records")
      .insertOne({
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
