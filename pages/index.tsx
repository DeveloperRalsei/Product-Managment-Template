import { MainLayout } from "@/layouts/main";
import { LoadingOverlay } from "@mantine/core";
import Cookie from 'js-cookie'
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const userToken = Cookie.get("userToken") || "";
  const router = useRouter()

  useEffect(() => {
    if (!userToken) {
      router.push("/login")
    }
  }, [userToken, router])

  console.log(userToken)

  return (
    <MainLayout>
      {userToken ? "Content" : <LoadingOverlay />}
    </MainLayout>
  )
}