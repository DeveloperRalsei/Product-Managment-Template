import { Database } from "sqlite3";

export const runQuery = (
  db: Database,
  query: string,
  params: any[] = []
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const runQueryAll = (
  db: Database,
  query: string,
  params: any[] = []
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const getCookie = (cookieName: string) => {
  const cookies = document.cookie.split(";");

  cookies.forEach((cookie) => {
    const parts = cookie.split("=");
    if (parts[0].trim() === cookieName) {
      return parts[1].trim();
    }
  });

  return "";
};
