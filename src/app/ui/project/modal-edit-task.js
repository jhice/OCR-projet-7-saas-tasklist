import { updateTask } from "@/app/actions/task-update";
import { cardCloseModal, closeModal } from "@/services/helpers";
import { format } from "date-fns";
import { useActionState } from "react";

export default function ModalEditTask({ taskInModal, setTaskInModal }) {

  const [state, action, pending] = useActionState(updateTask);

  return (
    <dialog id="modal-edit-task" data-modal-close="modal-edit-task" className="modal-card" onClick={(e) => cardCloseModal(e)}>
      <div className="relative p-6 sm:p-8">
        <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-edit-task" aria-label="Fermer" onClick={(e) => closeModal(e)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <h2 className="font-heading text-2xl font-bold text-ink">Modifier une tâche</h2>

        <form className="mt-6 flex flex-col gap-6" action={action}>
          <div>
            <label htmlFor="et-title" className="auth-label">Titre</label>
            <input id="et-title" name="title" type="text" placeholder="ex. Authentification JWT" autoFocus className="auth-input" defaultValue={taskInModal?.title} />
          </div>

          <div>
            <label htmlFor="et-desc" className="auth-label">Description</label>
            <textarea id="et-desc" name="description" rows="2" placeholder="Implémenter le système d'authentification avec tokens JWT" className="auth-input" defaultValue={taskInModal?.description}></textarea>
          </div>

          <div>
            <label htmlFor="dueDate" className="auth-label">Échéance</label>
            <div className="search-input-wrap">
              <input id="dueDate" name="dueDate" type="date" placeholder="9 mars" className="search-input date-input" defaultValue={taskInModal?.dueDate?.substring(0, 10)} />
            </div>
          </div>

          <div>
            <label className="auth-label">Contributeurs*</label>
            <div className="select-wrap">
              {taskInModal?.assignees?.map(assignee =>
                <span key={assignee.id}>
                  <input type="checkbox" name="assigneeIds" id={assignee.user.id} value={assignee.user.id} defaultChecked={true} />
                  <label htmlFor={assignee.user.id} className="pl-2">{assignee.user.name}</label>
                  <span>&nbsp;|&nbsp;</span>
                </span>
              )}
            </div>
          </div>

          <div>
            <span className="auth-label">Statut :</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <label className="cursor-pointer">
                <input type="radio" name="status" value="TODO" className="peer sr-only"
                  checked={taskInModal?.status === "TODO"}
                  onChange={(e) => setTaskInModal({...taskInModal, status: "TODO"})}
                />
                <span className="badge badge-todo peer-checked:ring-2 peer-checked:ring-red-300 peer-checked:ring-offset-1">À faire</span>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="status" value="IN_PROGRESS" className="peer sr-only"
                  checked={taskInModal?.status === "IN_PROGRESS"}
                  onChange={(e) => setTaskInModal({...taskInModal, status: "IN_PROGRESS"})}
                />
                <span className="badge badge-progress peer-checked:ring-2 peer-checked:ring-amber-300 peer-checked:ring-offset-1">En cours</span>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="status" value="DONE" className="peer sr-only"
                  checked={taskInModal?.status === "DONE"}
                  onChange={(e) => setTaskInModal({...taskInModal, status: "DONE"})}
                />
                <span className="badge badge-done peer-checked:ring-2 peer-checked:ring-emerald-300 peer-checked:ring-offset-1">Terminée</span>
              </label>
            </div>
          </div>

          <input type="hidden" name="projectId" defaultValue={taskInModal?.projectId} />
          <input type="hidden" name="taskId" defaultValue={taskInModal?.id} />
          <button type="submit" className="btn-dark">Enregistrer</button>
        </form>
      </div>
    </dialog>
  )
}