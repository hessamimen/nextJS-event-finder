function handler(req, res) {
  const eventId = req.query.eventId;

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
      id: new Date().toISOString(),
      email: email,
      name: name,
      text: text,
    };

    console.log(newComment);
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
}

export default handler;
