import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

export default function TaskListItem({ task, TASK_STATUS }) {
  return (
    <article className="task-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-ink">{task.title}</h3>
          <span className={"badge badge-" + task.status.toLowerCase()}>{TASK_STATUS[task.status]}</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{task.description}</p>
        <div className="task-meta mt-3">
          <Link href={"/projects/" + task.project.id} className="task-meta-item underline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
            {task.project.name}
          </Link>
          <span className="task-meta-sep">|</span>
          <span className="task-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
            {format(task.dueDate, "d LLLL y", {locale: fr})}
          </span>
          <span className="task-meta-sep">|</span>
          <span className="task-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
            {task.comments.length}
          </span>
        </div>
      </div>
      <a href="task.html" className="btn-dark shrink-0 self-start sm:self-center">Voir</a>
    </article>
  )
}