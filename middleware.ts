import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the user is authenticated by looking for a user item in localStorage
  // Note: In a real application, you would use a more secure method like JWT tokens

  // For demo purposes, we'll only protect certain routes
  const protectedPaths = ["/products/add", "/products/*/edit", "/transactions"]
  const path = request.nextUrl.pathname

  // Check if the current path matches any protected path pattern
  const isProtectedPath = protectedPaths.some((protectedPath) => {
    if (protectedPath.includes("*")) {
      const pathWithoutWildcard = protectedPath.replace("*", "")
      return path.startsWith(pathWithoutWildcard)
    }
    return path === protectedPath
  })

  // If it's a protected path, redirect to login
  // Note: This is just a placeholder since we can't actually check localStorage in middleware
  // In a real app, you would verify a session cookie or JWT token here

  // For demo purposes, we'll just let all requests through
  // In a real app, you would implement proper authentication checks
  return NextResponse.next()
}

