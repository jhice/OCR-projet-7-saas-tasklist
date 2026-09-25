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
              <input id="ct-due" name="dueDate" type="date" placeholder="jj/mm/aaaa" className="search-input date-input" />
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