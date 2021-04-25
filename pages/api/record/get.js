import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongo";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Method not supported" });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const { db } = await connectToDatabase();
    console.log("Getting Record");
    const records = await db
      .collection("records")
      .find({ user_id: ObjectId(session.user.uid) })
      .sort({ createdAt: -1 })
      .toArray();
    return res
      .status(200)
      .json({ message: "Successfully got records.", records });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Internal Server Error." });
  }
};

export default handler;
