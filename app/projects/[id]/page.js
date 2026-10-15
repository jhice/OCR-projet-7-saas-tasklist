import getSessionCookie from "../../lib/get-session-cookie";
import ProjectFull from "../../ui/project/project-full";
import { projectById } from "../../lib/api-bridge";
import handleApiError from "../../lib/handle-api-error";

export const metadata = {
  title: "Nom du projet",
};

/**
 * Page "Détail projet"
 * @param {string} id Identifiant du projet
 * @returns Promise<JSX.Element>
 */
export default async function ProjectDetail({ params }) {

  const { id } = await params;
  const session = await getSessionCookie();

  let projectData;
  try {
    projectData = await projectById(id, session.apiToken);
  } catch (error) {
    // 401 => logout, 403 => forbidden, 404 => notFound
    handleApiError(error);
  }
  // Les données du projet pour le composant
  const project = projectData.data.project;
  const tasks = projectData.data.project.tasks;

  return (
    <main className="flex-1">
      <div className="page-container">
        <ProjectFull project={project} tasks={tasks} userId={session.userId} userName={session.userName} />
      </div>
    </main>
  );
}