import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function getSessionCookie() {
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);
  console.log(session);
  return session;
}