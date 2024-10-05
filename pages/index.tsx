import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthUser } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    AuthUser()
      .then((user) => {
        if (user) {
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  return null;
}
