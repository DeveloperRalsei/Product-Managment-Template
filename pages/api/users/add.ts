import { NextApiRequest, NextApiResponse } from "next";
import { dbPath } from "@/lib/definitions";
import { OPEN_READWRITE, OPEN_CREATE, Database } from "sqlite3";
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

  const { name, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send("'email' and 'password' body parameters required!");
  }

  try {
    const db = await openDb()

    await runQuery(
      db,
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, isAdmin INTEGER DEFAULT 0)"
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    await runQuery(
      db,
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(200).json({ message: "User added successfully" });
  } catch (err: any) {
    console.error("An error occurred: ", err.message);
    return res.status(500).json({ error: "Operation failed: " + err.message });
  }
}
