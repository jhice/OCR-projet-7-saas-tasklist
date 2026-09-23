import { cardCloseModal, closeModal } from "@/services/helpers";

export default function ProjectCreateModal() {

  return (
    <dialog id="modal-create-project" className="modal-card" data-modal-close="modal-create-project" onClick={(e) => cardCloseModal(e)}>
      <div className="relative p-6 sm:p-8">
        <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-create-project" aria-label="Fermer" onClick={(e) => closeModal(e)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <h2 className="font-heading text-2xl font-bold text-ink">Créer un projet</h2>

        <form className="mt-6 flex flex-col gap-6">
          <div>
            <label htmlFor="cp-title" className="auth-label">Titre*</label>
            <input id="cp-title" name="title" type="text" required autoFocus className="auth-input" />
          </div>

          <div>
            <label htmlFor="cp-desc" className="auth-label">Description*</label>
            <textarea id="cp-desc" name="description" rows="2" required className="auth-input"></textarea>
          </div>

          <div>
            <label className="auth-label">Contributeurs</label>
            <div className="search-input-wrap">
              <button type="button" className="search-input w-full text-left text-gray-400">Choisir un ou plusieurs collaborateurs</button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon h-4 w-4">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <button type="submit" className="btn-dark" disabled>
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