import { assignedTasks } from "@/services/api";
import getSessionCookie from "./lib/get-session-cookie";
import Dashboard from "./ui/dashboard";

export const metadata = {
  title: "Tableau de bord",
};

export default async function Home() {

  const session = await getSessionCookie();
  const tasksResponse = await assignedTasks(session.apiToken);

  return (
    <>
      {/* Main */}
      <main className="flex-1">
        <div className="page-container">
          <Dashboard tasks={tasksResponse.data.tasks} session={session} />
        </div>
      </main>
    </>
  )
}