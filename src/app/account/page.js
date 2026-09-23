import AccountForm from "../ui/account-form";
import getSessionCookie from "../lib/get-session-cookie";

export const metadata = {
  title: "Mon compte",
};

export default async function Account() {

  const session = await getSessionCookie();

  return (
    <main className="flex-1">
      <div className="page-container">
        <AccountForm session={session} />
      </div>
    </main>
  )
}