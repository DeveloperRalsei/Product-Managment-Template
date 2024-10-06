import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { openDb, runQuery } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { name, email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .send("'role, email' and 'password' body parameters required!");
  }

  try {
    const db = await openDb()

    await runQuery(
      db,
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, role INTEGER DEFAULT 0)"
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    await runQuery(
      db,
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    return res.status(200).json({ message: "User added successfully" });
  } catch (err: any) {
    console.error("An error occurred: ", err.message);
    return res.status(500).json({ error: "Operation failed: " + err.message });
  }
}
