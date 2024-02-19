import { MongoClient } from "mongodb";
//importing this to hide passwords
import "dotenv/config";

const pass = process.env.MONGO_PASS;

async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    //update the password field everytime trying to connect to Mongodb
    `mongodb+srv://hessamimen:${pass}@events.sisrjke.mongodb.net/?retryWrites=true&w=majority`
  );

  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;
    const text = req.body.text;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === " " ||
      !text ||
      text.trim() === " "
    ) {
      res.status(422).json({ message: "Invalid input.", comment: newComment });
      return;
    }

    const newComment = {
      email: email,
      name: name,
      text: text,
      eventId: eventId,
    };
    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "comment added", comment: newComment });
  }
  if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }
  client.close();
}

export default handler;
