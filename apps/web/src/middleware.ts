import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("auth_token")?.value;

  const isLoginPage = path === "/admin/login";
  const isAdminRoute = path.startsWith("/admin");

  // if logged in user tries to view any admin page send to dashboard page
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin/bea/home", request.url));
  }

  // if unauthorized user tries to view any admin page, kick them out (except login page)
  if (isAdminRoute && !isLoginPage && !token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// middleware only run on admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
