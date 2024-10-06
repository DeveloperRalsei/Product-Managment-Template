import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  res.setHeader("Set-Cookie", "userToken=; HttpOnly; Path=/; Max-Age=3600") 
  return res.status(200).json({ message: "Logout successful" })
}