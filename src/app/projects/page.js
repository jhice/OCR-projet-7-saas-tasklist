import getSessionCookie from "../lib/get-session-cookie";
import { projects, projectsIdTasks } from "@/services/api";
import { ProjectsList } from "../ui/projects-list";
import { getProjectsStats } from "@/services/helpers";

export const metadata = {
  title: "Mes projets",
};

export default async function Projects() {

  const session = await getSessionCookie();
  const projectsResponse = await projects(session.apiToken);
  const projectsData = projectsResponse.data.projects;

  // get projects tasks statistics
  const projectsTasks = await getProjectsStats(projectsData, session.apiToken);
  // console.log(projectsTasks);

  return (
    <main className="flex-1">
      <div className="page-container">
        <ProjectsList projects={projectsData} projectsTasks={projectsTasks} />
      </div>
    </main>
  );
}