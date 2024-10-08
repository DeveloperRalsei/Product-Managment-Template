import { openDb, runQuery } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next/types";
import jwt, { JwtPayload } from 'jsonwebtoken'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.body;

  console.log(id)

  if (!id) {
    return res.status(400).json({ message: "id body parameter required!" });
  }

  
  try {
    const token = req.headers["authorization"]?.split(" ")[1]

    if(!token){
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    if(verifiedToken.role !== "admin"){
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const db = await openDb();

    runQuery(db, "DELETE FROM users WHERE id = ?", [id]);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("An error occurred: ", error.message);
    return res
      .status(500)
      .json({ error: "Operation failed: " + error.message });
  }
}
