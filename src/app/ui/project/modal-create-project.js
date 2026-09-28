import { createProject } from "@/app/actions/project-create";
import { cardCloseModal, closeModal } from "@/services/helpers";
import { useActionState, useState } from "react";
import { findUserByEmail } from "@/app/actions/project-contributors";
import MembersField from "../members-field";

export default function ProjectCreateModal() {

  const [state, action, pending] = useActionState(createProject, undefined);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contributors, setContributors] = useState([]);

  // vérifie que l'utilisateur existe avant de l'ajouter à la liste
  async function addContributor(email) {
    if (contributors.some(c => c.email.toLowerCase() === email.toLowerCase())) {
      return "Ce contributeur est déjà dans la liste.";
    }
    const { user, error } = await findUserByEmail(email);
    if (error) {
      return error;
    }
    setContributors(current => [...current, user]);
  }

  return (
    <dialog id="modal-create-project" className="modal-card" data-modal-close="modal-create-project" onClick={(e) => cardCloseModal(e)}>
      <div className="relative p-6 sm:p-8">
        <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-create-project" aria-label="Fermer" onClick={(e) => closeModal(e)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <h2 className="font-heading text-2xl font-bold text-ink">Créer un projet</h2>

        <form className="mt-6 flex flex-col gap-6" action={action}>
          <div>
            <label htmlFor="cp-name" className="auth-label">Titre*</label>
            <input id="cp-name" name="name" value={name} onChange={e => setName(e.target.value)} type="text" autoFocus className="auth-input" />
            {state?.errors?.name && <p className="text-[#CC3300] mt-2 ml-2 text-sm">{state.errors.name}</p>}
          </div>

          <div>
            <label htmlFor="cp-desc" className="auth-label">Description*</label>
            <textarea id="cp-desc" name="description" value={description} onChange={e => setDescription(e.target.value)} rows="2" className="auth-input"></textarea>
            {state?.errors?.description && <p className="text-[#CC3300] mt-2 ml-2 text-sm">{state.errors.description}</p>}
          </div>

          {/* contributeurs : liste locale, envoyée (emails) à la création */}
          <MembersField id="cp-contributors" label="Contributeurs"
            members={contributors}
            onAdd={addContributor}
            onRemove={member => setContributors(contributors.filter(c => c.id !== member.id))}
            hiddenName="contributors"
            hiddenKey="email"
            error={state?.errors?.contributors}
          />

          <button disabled={pending} type="submit" className="btn-dark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
            </svg>
            Ajouter un projet
          </button>
        </form>
      </div>
    </dialog>

  )
}