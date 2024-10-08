import { openDb, runQuery } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  console.log(id);

  try {
    const db = await openDb();

    db.all("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) {
        console.error("An error occurred while fetching data: ", err.message);
        return res
          .status(500)
          .json({ error: "Operation failed: " + err.message });
      }

      if(row.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(row[0]);
    });

    db.close();
  } catch (error: any) {
    console.error("An error occurred: ", error.message);
    return res
      .status(500)
      .json({ error: "Operation failed: " + error.message });
  }
}
