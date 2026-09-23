import { assignedTasks } from "@/services/api";
import getSessionCookie from "./lib/get-session-cookie";
import Dashboard from "./ui/dashboard";

export const metadata = {
  title: "Tableau de bord",
};

export default async function Home() {

  const session = await getSessionCookie();
  const tasksResponse = await assignedTasks(session.ApiToken);

  return (
    <>
      {/* Main */}
      <Dashboard tasks={tasksResponse.data.tasks} session={session} />
    </>
  )
}