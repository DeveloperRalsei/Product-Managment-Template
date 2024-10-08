import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { openDb } from "@/lib/utils";
import { User } from "@/lib/definitions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send("'email' and 'password' body parameters required!");
  }

  const db = await openDb();

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user: User | any) => {
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
          { name: user.name, email: user.email, id: user.id, role: user.role },
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
      } catch (error: any) {
        console.error("Unexpected error: ", error);
        return res
          .status(500)
          .json({ error: "Login failed: " + error.message });
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
