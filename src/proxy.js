/**
 * Script lu en amont de toutes les routes du projet.
 * Permet de gérer l'authentification.
 * (documentation Next.js)
 */

import { NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

// Routes publiques et privées
const publicRoutes = ["/login", "/register"];
const protectedRoutes = [/^\/$/, /^\/projects\/.+$/, /^\/projects$/, /^\/account$/, /^\/logout$/];

export default async function proxy(req) {
  // Vérifie si la route courante est publique ou privée
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  // Test des routes privées à base de regex
  // .some() retourne un booléen au lieu de l'élément trouvé
  const isProtectedRoute = protectedRoutes.some(route => route.test(path));
  
  // Décrypte la session depuis le cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // Redirige vers la page de login si utilisateur non connecté sur une route protégée
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirige vers la home (dashboard) si l'utilisateur est authentifié et souhaite accéder à login ou register
  if (
    isPublicRoute &&
    session?.userId
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // On continue le parcours HTTP (la route demandée)
  return NextResponse.next();
}

// Routes exclues du proxy (les assets notamment)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};