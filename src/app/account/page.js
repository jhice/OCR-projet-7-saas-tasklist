import AccountForm from "../ui/account-form";
import getSessionCookie from "../lib/get-session-cookie";
import { authProfile } from "@/services/api";

export const metadata = {
  title: "Mon compte",
};

export default async function Account() {

  const session = await getSessionCookie();
  const userData = await authProfile(session.apiToken);

  return (
    <main className="flex-1">
      <div className="page-container">
        <AccountForm userData={userData.data.user} />
      </div>
    </main>
  )
}