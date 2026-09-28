import getSessionCookie from "@/app/lib/get-session-cookie";
import ProjectFull from "@/app/ui/project/project-full";
import { projectById } from "@/services/api";
import { forbidden, notFound } from "next/navigation";

export const metadata = {
  title: "Nom du projet",
};

export default async function ProjectDetail({ params }) {

  const { id } = await params;
  const session = await getSessionCookie();

  let projectData;
  try {
    projectData = await projectById(id, session.apiToken);
  } catch (error) {
    // ni admin ni contributeur du projet => page 403 (src/app/forbidden.js)
    if (error.status === 403) {
      forbidden();
    }
    // projet inexistant => page 404
    if (error.status === 404) {
      notFound();
    }
    throw error;
  }
  // console.log(projectData);
  const project = projectData.data.project;
  const tasks = projectData.data.project.tasks;

  return (
    <main className="flex-1">
      <div className="page-container">
        <ProjectFull project={project} tasks={tasks} session={session} />
      </div>
    </main>
  )
}