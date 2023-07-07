import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const nextRedirect = new URL("/", request.url);

  return NextResponse.redirect(nextRedirect, {
    headers: {
      "Set-Cookie": `token=; path=/; max-age=0`, //
    },
  });
}
