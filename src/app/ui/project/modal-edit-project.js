import { updateProject } from "@/app/actions/project-update";
import { cardCloseModal, closeModal } from "@/services/helpers";
import { useActionState } from "react";

export default function ModalEditProject({ project }) {

  const [state, action, pending] = useActionState(updateProject, undefined);

  return (
    <dialog id="modal-edit-project" data-modal-close="modal-edit-project" className="modal-card" onClick={(e) => cardCloseModal(e)}>
      <div className="relative p-6 sm:p-8">
        <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-edit-project" aria-label="Fermer" onClick={(e) => closeModal(e)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <h2 className="font-heading text-2xl font-bold text-ink">Modifier un projet</h2>

        <form className="mt-6 flex flex-col gap-6" action={action}>
          <div>
            <label htmlFor="cp-name" className="auth-label">Titre*</label>
            <input id="cp-name" name="name" type="text" autoFocus className="auth-input" defaultValue={project.name} />
          </div>

          <div>
            <label htmlFor="cp-desc" className="auth-label">Description*</label>
            <textarea id="cp-desc" name="description" rows="2" className="auth-input" defaultValue={project.description}></textarea>
          </div>

          <div>
            <label className="auth-label">Contributeurs*</label>
            <div className="select-wrap">

              {/* contributors */}
              {project.members.map(member => 
              <span key={member.id}>
                <input type="checkbox" name="contributors" id={member.user.id} value={member.user.email} defaultChecked={true} />
                <label htmlFor={member.user.id} className="pl-2">{member.user.name}</label>
                <span>&nbsp;|&nbsp;</span>
              </span>
              )}
            </div>
          </div>

          <input type="hidden" name="id" defaultValue={project.id} />
          <button type="submit" className="btn-dark">Enregistrer</button>
        </form>
      </div>
    </dialog>
  )
}