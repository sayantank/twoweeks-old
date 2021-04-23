import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongo";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    res.status(400).json({ message: "Method not supported" });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    console.log(req.body);
    const { id } = req.body;
    const { db } = await connectToDatabase();
    console.log("Deleting Record ", id);
    await db.collection("records").findOneAndDelete({ _id: ObjectId(id) });
    return res.status(200).json({ message: "Successfully deleted record." });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

export default handler;
