import { Database } from "sqlite3";
import { dbPath } from "./definitions";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import jwt from 'jsonwebtoken'

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

export const openDb = async (): Promise<Database> => {
  return new Promise((resolve, reject) => {
    const db = new Database(dbPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
};

export function getToken(getServerSidePropsFunc?: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const token = req.cookies.userToken || "";

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      
      if (getServerSidePropsFunc) {
        return await getServerSidePropsFunc(context);
      }
      return { props: {token} };
    } catch (error) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  };
}