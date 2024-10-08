export const dbPath =
  process.env.NODE_ENV === "development" ? "./db/devDb.db" : "./db/db.db";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "mod" | "admin";
}