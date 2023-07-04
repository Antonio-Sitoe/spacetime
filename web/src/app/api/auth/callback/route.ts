import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const { data } = await api.post("/register", {
    code,
  });
  const { token } = data;

  const nextRedirect = new URL("/", request.url);

  const cookieExpire = 60 * 60 * 24 * 30;

  return NextResponse.redirect(nextRedirect, {
    headers: {
      "Set-Cookie": `token=${token}; path=/; max-age=${cookieExpire}`,
    },
  });
}
