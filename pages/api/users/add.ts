import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { openDb, runQuery, runQueryAll } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ error: "Method not allowed. Use POST method" });
  }

  const { name, email, password, role } = req.body;

  if (!name || !role || !email || !password) {
    return res
      .status(400)
      .json({
        error: "Please provide all fields: name, email, password, role",
      });
  }

  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    });

    const decoded = jwt.decode(token) as jwt.JwtPayload

    if (decoded.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await openDb();

    await runQuery(
      db,
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, role TEXT)"
    );

    db.all("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "An error occurred" });
      }
      if (rows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }
    });

    await runQuery(
      db,
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    db.close();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating user" });
  }
}
