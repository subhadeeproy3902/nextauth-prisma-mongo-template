import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const privateRoutes = ["/verify-request"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (privateRoutes.includes(pathname)) {
    const referer = request.headers.get("referer");
    const fromRegisterCookie = request.cookies.get("fromRegister")?.value;
    const isRedirectedFromRegister = referer
      ? new URL(referer).pathname === "/register"
      : false;

    if (!isRedirectedFromRegister && !fromRegisterCookie) {
      const registerURL = new URL("/register", request.nextUrl.origin);
      return NextResponse.redirect(registerURL.toString());
    }

    const response = NextResponse.next();
    if (isRedirectedFromRegister && !fromRegisterCookie) {
      response.cookies.set("fromRegister", "true", { maxAge: 60 });
    }

    if (pathname !== "/verify-request") {
      return NextResponse.redirect(`/verify-request`);
    }

    return response;
  }

  const session = await auth();
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!session && isProtected) {
    const absoluteURL = new URL("/register", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};