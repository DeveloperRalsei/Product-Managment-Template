import { LoadingOverlay } from "@mantine/core";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userToken = Cookie.get("userToken") || "";

    if (!userToken || userToken.length === 0) {
      router.push("/login");
    } else {
      router.push("/dashboard");
      setLoading(false);
    }
  }, [router]);

  if(loading) {
    return (
      <LoadingOverlay visible={loading} />
    )
  }
}
