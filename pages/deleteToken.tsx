import router from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function DeleteToken() {
  useEffect(() => {
    Cookies.remove("userToken")
    router.push("/login")
  }, [])

  return null;
}