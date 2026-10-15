"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Route handler GET /logout
 * Route personnalisée : pas de vue, logout + redirection
 * @link https://nextjs.org/docs/app/api-reference/file-conventions/route
 * @returns Promise<JSX.Element>
 */
export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
