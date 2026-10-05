import { assignedTasks } from "@/services/api";
import getSessionCookie from "./lib/get-session-cookie";
import handleApiError from "./lib/handle-api-error";
import Dashboard from "./ui/dashboard";

export const metadata = {
  title: "Tableau de bord",
};

export default async function Home() {

  const session = await getSessionCookie();
  let tasksResponse;
  try {
    tasksResponse = await assignedTasks(session.apiToken);
  } catch (error) {
    handleApiError(error);
  }

  return (
    <>
      {/* Main */}
      <main className="flex-1">
        <div className="page-container">
          <Dashboard tasks={tasksResponse.data.tasks} session={session} />
        </div>
      </main>
    </>
  );
}