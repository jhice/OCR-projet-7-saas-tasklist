import getSessionCookie from "@/app/lib/get-session-cookie";
import TaskItem from "@/app/ui/project/project-task-item";
import { projectById, projectsIdTasks } from "@/services/api";

export const metadata = {
  title: "Nom du projet",
};

export default async function ProjectDetail({ params }) {

  const { id } = await params;
  const session = await getSessionCookie();
  const projectData = await projectById(id, session.apiToken);
  // console.log(projectData);
  const project = projectData.data.project;
  const tasks = projectData.data.project.tasks;

  return (
    <main className="flex-1">
      <div className="page-container">
        <TaskItem project={project} tasks={tasks} />
      </div>
    </main>
  )
}