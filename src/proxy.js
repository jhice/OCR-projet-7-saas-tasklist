/**
 * Script lu en amont de toutes les routes du projet.
 * Permet de gérer l'authentification.
 * (documentation Next.js)
 */

import { NextResponse } from 'next/server';
import { decrypt } from '@/app/lib/session';
import { cookies } from 'next/headers';

// 1. Routes publiques et privées
const publicRoutes = ['/login', "/register"];
const protectedRoutes = ["/", "/projects/:path*", "/projects", "/account", "logout"];

export default async function proxy(req) {
  // 2. Vérifie si la route courante est publique ou privée
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 6. Redirect to / if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/')
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // On continue le parcours HTTP
  return NextResponse.next();
}

// Routes exclues du proxy
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};