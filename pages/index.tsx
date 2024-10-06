import { GetServerSideProps } from "next";
import jwt from 'jsonwebtoken'
import { LoadingOverlay } from "@mantine/core";;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {req} = context
  const token = req.cookies.userToken || ""

  try {
    jwt.verify(token, process.env.JWT_SECRET as string)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
}

export default function Home() {
  return (
    <LoadingOverlay/>
  );
}