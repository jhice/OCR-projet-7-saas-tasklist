import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// secret pour l'encodage de la clé
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Chiffrement signé d'une donnée reçue
 * @param {string} payload 
 */
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/**
 * Déchiffrement et validation d'un token donné
 * @param {string} session 
 * @returns JWTPayload|null Le token validé ou null
 */
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
    console.log("Failed to verify session");
    return null;
  }
}

/**
 * Création d'une session à partir des infos données
 * @param {string} userId 
 * @param {string} userName 
 * @param {string} userEmail 
 * @param {string} apiToken token reçu de l'API backend
 */
export async function createSession(userId, userName, userEmail, apiToken) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, userName, userEmail, apiToken, expiresAt });
  const cookieStore = await cookies();
 
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}