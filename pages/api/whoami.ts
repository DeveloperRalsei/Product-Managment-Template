import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function whoami(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies["userToken"]

  if (!token) return res.status(401).json({ message: "Wrong Usage" });

  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err, decoded) => {
        if(err) throw new Error("Invalid token");
        return res.status(200).json(decoded);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
