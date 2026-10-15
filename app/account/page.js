import AccountForm from "../ui/account-form";
import getSessionCookie from "../lib/get-session-cookie";
import handleApiError from "../lib/handle-api-error";
import { authProfile } from "../lib/api-bridge";

export const metadata = {
  title: "Mon compte",
};

/**
 * Page "Mon compte"
 * @returns Promise<JSX.Element>
 */
export default async function Account() {

  const session = await getSessionCookie();
  let userData;
  try {
    userData = await authProfile(session.apiToken);
  } catch (error) {
    handleApiError(error);
  }

  return (
    <main className="flex-1">
      <div className="page-container">
        <AccountForm userData={userData.data.user} />
      </div>
    </main>
  );
}