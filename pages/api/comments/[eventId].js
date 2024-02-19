import { MongoClient } from "mongodb";
//importing this to hide passwords
import "dotenv/config";

const pass = process.env.MONGO_PASS;

async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    //update the password field everytime trying to connect to Mongodb
    `mongodb+srv://hessamimen:${pass}@cluster0.sisrjke.mongodb.net/?retryWrites=true&w=majority`
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

    const result = await db.collection("comments").insertOne({
      newComment,
    });

    console.log(result);
    res.status(201).json({ message: "comment added", comment: newComment });
  }
  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "user1", text: "first comment" },
      { id: "c2", name: "user2", text: "second comment" },
      { id: "c3", name: "user3", text: "third comment" },
    ];

    res.status(200).json({ comments: dummyList });
  }
  client.close();
}

export default handler;
