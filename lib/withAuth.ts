import { GetServerSideProps, GetServerSidePropsContext } from "next";
import jwt from "jsonwebtoken";

export function withAuth(getServerSidePropsFunc?: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const token = req.cookies.userToken || "";

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      
      if (getServerSidePropsFunc) {
        return await getServerSidePropsFunc(context);
      }
      return { props: {} };
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
