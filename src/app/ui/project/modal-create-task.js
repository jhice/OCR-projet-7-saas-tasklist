import { createTask } from "@/app/actions/task-create";
import { cardCloseModal, closeModal } from "@/services/helpers";
import { useActionState } from "react";

export default function ModalCreateTask({ project }) {

  const [state, action, pending] = useActionState(createTask);

  return (
    <dialog id="modal-create-task" data-modal-close="modal-create-task" className="modal-card" onClick={(e) => cardCloseModal(e)}>
      <div className="relative p-6 sm:p-8">
        <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-create-task" aria-label="Fermer" onClick={(e) => closeModal(e)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <h2 className="font-heading text-2xl font-bold text-ink">Créer une tâche</h2>

        <form className="mt-6 flex flex-col gap-6" action={action}>
          <div>
            <label htmlFor="ct-title" className="auth-label">Titre*</label>
            <input id="ct-title" name="title" type="text" autoFocus className="auth-input" />
          </div>

          <div>
            <label htmlFor="ct-desc" className="auth-label">Description*</label>
            <textarea id="ct-desc" name="description" rows="2" className="auth-input"></textarea>
          </div>

          <div>
            <label htmlFor="ct-due" className="auth-label">Échéance*</label>
            <div className="search-input-wrap">
              <input id="ct-due" name="dueDate" type="date" placeholder="jj/mm/aaaa" className="search-input" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon h-4 w-4">
                <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div>
            <label className="auth-label">Contributeurs*</label>
            <div className="select-wrap">

              <span>
                <input type="checkbox" name="assigneeIds" id="a" value={"cmugpcw2h0000p9yupya9vg4u"} />
                <label htmlFor="a" className="pl-2">Alice Martin</label>
                <span>&nbsp;|&nbsp;</span>
              </span>
              <span>
                <input type="checkbox" name="assigneeIds" id="b" value={"cmugpcwbh0007p9yu0pavnf2g"} />
                <label htmlFor="b" className="pl-2">Henri Dupont</label>
                <span>&nbsp;|&nbsp;</span>
              </span>
              <span>
                <input type="checkbox" name="assigneeIds" id="c" value={"cmugpcw7m0004p9yuxtxm1j6p"} />
                <label htmlFor="c" className="pl-2">Emma Watson</label>
                <span>&nbsp;|&nbsp;</span>
              </span>

            </div>
          </div>

          <div>
            <span className="auth-label">Statut :</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <label className="cursor-pointer">
                <input type="radio" name="ct-status" value="todo" className="peer sr-only" />
                <span className="badge badge-todo peer-checked:ring-2 peer-checked:ring-red-300 peer-checked:ring-offset-1">À faire</span>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="ct-status" value="progress" className="peer sr-only" />
                <span className="badge badge-progress peer-checked:ring-2 peer-checked:ring-amber-300 peer-checked:ring-offset-1">En cours</span>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="ct-status" value="done" className="peer sr-only" />
                <span className="badge badge-done peer-checked:ring-2 peer-checked:ring-emerald-300 peer-checked:ring-offset-1">Terminée</span>
              </label>
            </div>
          </div>

          <input type="hidden" name="projectId" defaultValue={project.id} />
          <button type="submit" className="btn-dark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
            </svg>
            Ajouter une tâche
          </button>
        </form>
      </div>
    </dialog>
  )
}