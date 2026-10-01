import { createTask } from "@/app/actions/task-create";
import { cardCloseModal, closeModal } from "@/services/helpers";
import { format } from "date-fns";
import { useActionState, useState } from "react";
import AssigneesField from "./assignees-field";

export default function ModalCreateTask({ project }) {

  const [state, action, pending] = useActionState(createTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(format(new Date(), "yyyy-MM-dd"));

  return (
    <dialog id="modal-create-task" aria-labelledby="modal-create-task-title" data-modal-close="modal-create-task" className="modal-card" onClick={(e) => cardCloseModal(e)}>
      <div className="relative p-6 sm:p-8">
        <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-create-task" aria-label="Fermer" onClick={(e) => closeModal(e)}>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <h2 id="modal-create-task-title" className="font-heading text-2xl font-bold text-ink">Créer une tâche</h2>
        <p className="mt-2 text-sm text-gray-500">Les champs marqués d&apos;un astérisque (*) sont obligatoires.</p>

        <form className="mt-6 flex flex-col gap-6" action={action}>
            <div>
              <label htmlFor="ct-title" className="auth-label">Titre<span aria-hidden="true">*</span></label>
              <input id="ct-title" aria-required="true" aria-invalid={!!state?.errors?.title} aria-describedby={state?.errors?.title ? "ct-title-error" : undefined} name="title" value={title} onChange={e => setTitle(e.target.value)} type="text" autoFocus className="auth-input" />
              {state?.errors?.title && <p id="ct-title-error" className="text-[#CC3300] mt-2 ml-2 text-sm">{state.errors.title}</p>}
            </div>

            <div>
              <label htmlFor="ct-desc" className="auth-label">Description<span aria-hidden="true">*</span></label>
              <textarea id="ct-desc" aria-required="true" aria-invalid={!!state?.errors?.description} aria-describedby={state?.errors?.description ? "ct-desc-error" : undefined} name="description" value={description} onChange={e => setDescription(e.target.value)} rows="2" className="auth-input"></textarea>
              {state?.errors?.description && <p id="ct-desc-error" className="text-[#CC3300] mt-2 ml-2 text-sm">{state.errors.description}</p>}
            </div>

            <div>
              <label htmlFor="ct-due" className="auth-label">Échéance<span aria-hidden="true">*</span></label>
              <div className="search-input-wrap">
                <input id="ct-due" aria-required="true" aria-invalid={!!state?.errors?.dueDate} aria-describedby={state?.errors?.dueDate ? "ct-due-error" : undefined} name="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="jj/mm/aaaa" className="search-input date-input" />
              </div>
              {state?.errors?.dueDate && <p id="ct-due-error" className="text-[#CC3300] mt-2 ml-2 text-sm">{state.errors.dueDate}</p>}
            </div>

          <AssigneesField id="ct-assignees" project={project} error={state?.errors?.assigneeIds} />

          <input type="hidden" name="projectId" defaultValue={project.id} />
          <button disabled={pending} type="submit" className="btn-dark">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
            </svg>
            Ajouter une tâche
          </button>
        </form>
      </div>
    </dialog>
  )
}