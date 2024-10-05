import Cookies from 'js-cookie'

export const AuthUser = async () => {
  const token = Cookies.get("userToken") || "";

  if(!token) {
    return false
  }

  try {
    const decodedToken = await fetch("/api/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })

    if(process.env.NODE_ENV === "development") {
      console.log(decodedToken)
    }
  } catch (error) {
    throw new Error("Token verification failed")
  }
}