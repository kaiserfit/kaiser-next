import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname == "/") {
    url.pathname = "/quiz";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
