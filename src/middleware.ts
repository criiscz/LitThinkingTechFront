import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./utils/aws/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const authenticatedRoutes = [
    "/dashboard",
    "/companies",
    "/inventory",
    "/orders",
    "/customers",
    "/categories",
    "/users",
  ];

  const adminRoutes = [
    "/users"
  ];

  const isOnAuthenticatedRoute = authenticatedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isOnAdminArea = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isOnAuthenticatedRoute) {
    if (!user)
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    if (isOnAdminArea && !user.isAdmin)
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    return response;
  } else if (user) {
    if(request.nextUrl.pathname === "/logout")
      return response;
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
