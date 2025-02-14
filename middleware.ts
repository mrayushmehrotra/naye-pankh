import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that can be accessed without authentication
const publicRoutes = ["/auth"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value; // Check for auth token

  // Allow access if the route is public or the user is authenticated
  if (publicRoutes.includes(req.nextUrl.pathname) || token) {
    return NextResponse.next();
  }

  // Redirect to /auth if the user is not authenticated
  return NextResponse.redirect(new URL("/auth", req.url));
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*", // Matches all routes
};
