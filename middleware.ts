import { NextResponse } from "next/server";

export default function middleware() {

  fetch("/api/whoami").then(response => console.log(response .json())).catch(err => console.log(err))
  return NextResponse.next()
}

export const config = {
  matcher: "/dashboard/:path*",
}