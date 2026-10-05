import { updateProject } from "@/app/actions/project-update";
import { addContributor, removeContributor } from "@/app/actions/project-contributors";
import { cardCloseModal, closeModal, getProjectMembers } from "@/services/helpers";
import { useActionState, useState } from "react";
import MembersField from "../members-field";

export default function ModalEditProject({ project }) {

  const [state, action, pending] = useActionState(updateProject, undefined);

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  return (
    <dialog id="modal-edit-project" aria-labelledby="modal-edit-project-title" data-modal-close="modal-edit-project" className="modal-card" onClick={(e) => cardCloseModal(e)}>
      <div className="relative p-6 sm:p-8">
        <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-edit-project" aria-label="Fermer" onClick={(e) => closeModal(e)}>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <h2 id="modal-edit-project-title" className="font-heading text-2xl font-bold text-ink">Modifier un projet</h2>
        <p className="mt-2 text-sm text-gray-500">Les champs marqués d&apos;un astérisque (*) sont obligatoires.</p>

        <form className="mt-6 flex flex-col gap-6" action={action}>
          <div>
            <label htmlFor="cp-name" className="auth-label">Titre<span aria-hidden="true">*</span></label>
            <input id="cp-name" aria-required="true" aria-invalid={!!state?.errors?.name} aria-describedby={state?.errors?.name ? "cp-name-error" : undefined} name="name" type="text" autoFocus className="auth-input" value={name} onChange={e => setName(e.target.value)} />
            {state?.errors?.name && <p id="cp-name-error" className="text-[#CC3300] mt-2 ml-2 text-sm">{state.errors.name}</p>}
          </div>

          <div>
            <label htmlFor="cp-desc" className="auth-label">Description<span aria-hidden="true">*</span></label>
            <textarea id="cp-desc" aria-required="true" aria-invalid={!!state?.errors?.description} aria-describedby={state?.errors?.description ? "cp-desc-error" : undefined} name="description" rows="2" className="auth-input" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            {state?.errors?.description && <p id="cp-desc-error" className="text-[#CC3300] mt-2 ml-2 text-sm">{state.errors.description}</p>}
          </div>

          {/* contributeurs : ajout / retrait appliqués tout de suite via l'API */}
          <MembersField id="ep-contributors" label="Contributeurs"
            members={getProjectMembers(project)}
            onAdd={async email => (await addContributor(project.id, email)).error}
            onRemove={async member => (await removeContributor(project.id, member.id)).error}
            canRemove={member => member.id !== project.owner?.id}
          />

          {state?.errors?.update && <p role="alert" className="text-[#CC3300] ml-2 text-sm">{state.errors.update}</p>}

          <input type="hidden" name="id" defaultValue={project.id} />
          <button disabled={pending} type="submit" className="btn-dark">Enregistrer</button>
        </form>
      </div>
    </dialog>
  );
}