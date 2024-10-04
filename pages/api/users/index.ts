import { dbPath } from "@/pages/definitions";
import { runQueryAll } from "@/pages/api/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "sqlite3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = new Database(dbPath, (err) => {
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

  try {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        console.error("An error occurred while fetching data: ", err.message);
        return res
          .status(500)
          .json({ error: "Operation failed: " + err.message });
      }

      res.status(200).json(rows);
    });
  } catch (error: any) {
    console.error("An error occurred: ", error.message);
    return res.status(500).json({ error: "Operation failed: " + error.message });
  }
}
