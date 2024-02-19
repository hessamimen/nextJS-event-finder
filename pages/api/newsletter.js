import { MongoClient } from "mongodb";
//importing this to hide passwords
import "dotenv/config";

const pass = process.env.MONGO_PASS;

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = await MongoClient.connect(
      //update the password field everytime trying to connect to Mongodb
      `mongodb+srv://hessamimen:${pass}@cluster0.sisrjke.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db();

    await db.collection("emails").insertOne({
      email: userEmail,
    });

    client.close();

    res.status(201).json({ message: "Signed Up!" });
  } else {
    res.status(201).json({ message: " it works success" });
  }
}

export default handler;
