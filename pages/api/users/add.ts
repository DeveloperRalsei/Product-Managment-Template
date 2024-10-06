import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { openDb, runQuery } from "@/lib/utils";
import { User } from "@/lib/definitions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as JwtPayload;

    const { name, email, password, role } = req.body;

    // roles: 0 - moderator, 1 - user, 2 - admin
    if (decoded.role !== 2) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Only admins can add users." });
    }

    // Ensure the 'role' field is valid (0 - user, 1 - mod, 2 - admin)
    if (![0, 1, 2].includes(role)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    if (!email || !password || !role) {
      return res
        .status(400)
        .send("'role, email' and 'password' body parameters required!");
    }

    const db = await openDb();

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
