import { cookies } from "next/headers";
import { decrypt } from "../lib/session";
import AccountForm from "../ui/account-form";
import { authProfile } from "@/services/api";

export const metadata = {
  title: "Mon compte",
};

export default async function Account() {

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);
  console.log(session);

  // get profile
  const profile = await authProfile(session.ApiToken);
  console.log(profile);

  return (
    <>
      <AccountForm profile={profile.data.user} />
    </>
  )
}