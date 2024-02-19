import path from "path";
import fs from "fs";

function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    // const newUser = {
    //   id: new Date().toISOString(),
    //   email: userEmail,
    // };

    // const filePath = path.join(process.cwd(), "data", "users.json");
    // const fileData = fs.readFileSync(filePath);
    // console.log("fileData:", fileData);
    // const data = JSON.parse(fileData);

    // data.push(newUser);

    // fs.writeFileSync(filePath, JSON.stringify(data));

    console.log(userEmail);

    res.status(201).json({ message: "Signed Up!" });
  } else {
    res.status(201).json({ message: " it works success" });
  }
}

export default handler;
