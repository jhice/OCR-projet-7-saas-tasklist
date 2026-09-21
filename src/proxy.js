import { NextResponse } from "next/server"
 
// on est côté back ici
export function proxy(request) {
  console.log(request.url);
  console.log(request.headers);
  
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    // includes
    "/", "/projects/:path*", "/projects", "/account", "/profile",
  ],
}