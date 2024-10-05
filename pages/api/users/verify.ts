import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  const token = req.headers.authorization?.split(" ")[1]

  if(!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    return res.status(200).json({ message: "Token verified successfully", decoded})
  } catch (error) {
    return res.status(401).json({ message: "Token verification failed", error })
  }
}