import getSessionCookie from "../lib/get-session-cookie";
import handleApiError from "../lib/handle-api-error";
import { projects, projectsIdTasks } from "@/services/api";
import { ProjectsList } from "../ui/projects-list";
import { getProjectsStats } from "@/services/helpers";

export const metadata = {
  title: "Mes projets",
};

export default async function Projects() {

  const session = await getSessionCookie();
  let projectsData, projectsTasks;
  try {
    const projectsResponse = await projects(session.apiToken);
    projectsData = projectsResponse.data.projects;

    // get projects tasks statistics
    projectsTasks = await getProjectsStats(projectsData, session.apiToken);
  } catch (error) {
    handleApiError(error);
  }
  // console.log(projectsTasks);

  return (
    <main className="flex-1">
      <div className="page-container">
        <ProjectsList projects={projectsData} projectsTasks={projectsTasks} />
      </div>
    </main>
  );
}