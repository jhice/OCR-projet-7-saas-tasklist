import getSessionCookie from "../lib/get-session-cookie";
import handleApiError from "../lib/handle-api-error";
import { projects } from "../lib/api-bridge";
import { ProjectsList } from "../ui/project/projects-list";
import { getProjectsStats } from "../lib/helpers";

export const metadata = {
  title: "Mes projets",
};

/**
 * Page "Liste des projets"
 * @returns Promise<JSX.Element>
 */
export default async function Projects() {

  const session = await getSessionCookie();
  let projectsData, projectsTasks;
  try {
    const projectsResponse = await projects(session.apiToken);
    projectsData = projectsResponse.data.projects;

    // Get projects tasks statistics
    projectsTasks = await getProjectsStats(projectsData, session.apiToken);
  } catch (error) {
    handleApiError(error);
  }

  return (
    <main className="flex-1">
      <div className="page-container">
        <ProjectsList projects={projectsData} projectsTasks={projectsTasks} />
      </div>
    </main>
  );
}