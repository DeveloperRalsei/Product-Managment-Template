import { GetServerSideProps } from "next";
import dynamic from "next/dynamic"
import { useState } from "react";
import jwt from "jsonwebtoken";
import { LoadingOverlay } from "@mantine/core";
const MainLayout = dynamic(() => import('@/layouts/mainLayout').then(mod => mod.MainLayout), { ssr: false })

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const token = req.cookies.userToken || ""

  try {
    jwt.verify(token, process.env.JWT_SECRET as string)
    return {
      props: {},
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

export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  return (
    <MainLayout>
      <h1>Dashboard</h1>
    </MainLayout>
  )
}