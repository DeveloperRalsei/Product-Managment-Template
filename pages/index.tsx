import { LoadingOverlay } from "@mantine/core";import { withAuth } from "@/lib/withAuth";
import jwt from 'jsonwebtoken'

export const getServerSideProps = withAuth(
  async (context) => {
    const { req } = context
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
)

export default function Home() {
  return (
    <LoadingOverlay/>
  );
}