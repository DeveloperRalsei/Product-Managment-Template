import dynamic from "next/dynamic"
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from 'js-cookie'
import { AuthUser } from "@/lib/auth";
const MainLayout = dynamic(() => import('@/layouts/mainLayout').then(mod => mod.MainLayout), { ssr: false })

export default function Dashboard() {
  const router = useRouter()
  useEffect(() => {
    const token = Cookies.get("userToken") || ""

    if(token) {
      AuthUser().then((user) => {
        if(user) {
        } else {
          router.push("/login")
        }
      })
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <MainLayout>
      <h1>Dashboard</h1>
    </MainLayout>
  )
}