import { MongoClient } from "mongodb";
//importing this to hide passwords
import "dotenv/config";

const pass = process.env.MONGO_PASS;

async function conectDatabase() {
  const client = await MongoClient.connect(
    //update the password field everytime trying to connect to Mongodb
    `mongodb+srv://hessamimen:${pass}@events.sisrjke.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}
async function insertDocument(client, document) {
  const db = client.db();

  await db.collection("newsletter").insertOne(document);
}

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    try {
      client = await conectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed." });
      return;
    }

    try {
      await insertDocument(client, {
        email: userEmail,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed Up!" });
  } else {
    res.status(201).json({ message: " it works success" });
  }
}

export default handler;
