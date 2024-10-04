import { NextApiRequest, NextApiResponse } from "next";
import { dbPath } from "@/pages/definitions";
import sql, { Database } from "sqlite3";
import bcrypt from "bcrypt";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send("'email' and 'password' body parameters required!");
  }

  const db = new Database(dbPath, sql.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(
        "An error occurred while connection to database: ",
        err.message
      );
      return res
        .status(500)
        .json({ error: "Databse connection failed: " + err.message });
    }
  });


  db.close()
}