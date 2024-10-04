import { dbPath } from "@/lib/definitions";
import { NextApiRequest, NextApiResponse } from "next";
import { Database, OPEN_CREATE, OPEN_READWRITE } from "sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const db = new Database(dbPath, OPEN_READWRITE | OPEN_CREATE, (err) => {
    if (err) {
      console.error(
        "An error occurred while connecting to the database: ",
        err.message
      );
      return res
        .status(500)
        .json({ error: "Database connection failed: " + err.message });
    }
  });

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user: any) => {
      if (err) {
        console.error("An error occurred while fetching data: ", err.message);
        return res
          .status(500)
          .json({ error: "Operation failed: " + err.message });
      }

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      try {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
          { email: user.email },
          String(process.env.JWT_SECRET),
          {
            expiresIn: "1h",
          }
        );

        res.setHeader(
          "Set-Cookie",
          `userToken=${token}; HttpOnly; Path=/; Max-Age=3600`
        );
        return res.status(200).json({ message: "Login successful" });
      } catch (compareError: any) {
        console.error("Error comparing passwords: ", compareError);
        return res
          .status(500)
          .json({ error: "Login failed: " + compareError.message });
      } finally {
        db.close((closeErr) => {
          if (closeErr) {
            console.error("Error closing the database: ", closeErr.message);
          }
        });
      }
    }
  );
}
