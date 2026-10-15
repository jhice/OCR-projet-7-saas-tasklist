import { cookies } from "next/headers";
import { decrypt } from "./session";

/**
 * Récupère la session utilisateur si existante
 * @returns JWTPayload|null
 */
export default async function getSessionCookie() {
  
  // Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  
  // Cookie absent ?
  if (cookie === undefined) {
    return null;
  }

  // Cookie présent
  const session = await decrypt(cookie);

  return session;
}