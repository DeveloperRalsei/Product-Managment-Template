export const dbPath =
  process.env.NODE_ENV === "development" ? "./db/devDb.db" : "./db/db.db";
