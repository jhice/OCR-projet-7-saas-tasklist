import getSessionCookie from "../lib/get-session-cookie";
import { projects } from "@/services/api";
import { ProjectsList } from "../ui/projects-list";

export const metadata = {
  title: "Mes projets",
};

export default async function Projects() {

  const session = await getSessionCookie();
  const projectsResponse = await projects(session.apiToken);

  return (
    <main className="flex-1">
      <div className="page-container">
        <ProjectsList projects={projectsResponse.data.projects} />
      </div>
    </main>
  )
}