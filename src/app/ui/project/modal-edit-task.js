import { cardCloseModal, closeModal } from "@/services/helpers";

export default function ModalEditTask() {
  return (
    <dialog id="modal-edit-task" data-modal-close="modal-edit-task" className="modal-card" onClick={(e) => cardCloseModal(e)}>
      <div className="relative p-6 sm:p-8">
        <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-edit-task" aria-label="Fermer" onClick={(e) => closeModal(e)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <h2 className="font-heading text-2xl font-bold text-ink">Modifier une tâche</h2>

        <form className="mt-6 flex flex-col gap-6">
          <div>
            <label htmlFor="et-title" className="auth-label">Titre</label>
            <input id="et-title" name="title" type="text" placeholder="Authentification JWT" autoFocus className="auth-input" />
          </div>

          <div>
            <label htmlFor="et-desc" className="auth-label">Description</label>
            <textarea id="et-desc" name="description" rows="2" placeholder="Implémenter le système d'authentification avec tokens JWT" className="auth-input"></textarea>
          </div>

          <div>
            <label htmlFor="et-due" className="auth-label">Échéance</label>
            <div className="search-input-wrap">
              <input id="et-due" name="due" type="text" placeholder="9 mars" className="search-input" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon h-4 w-4">
                <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div>
            <label className="auth-label">Assigné à :</label>
            <div className="search-input-wrap">
              <button type="button" className="search-input w-full text-left text-gray-400">2 collaborateurs</button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon h-4 w-4">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div>
            <span className="auth-label">Statut :</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <label className="cursor-pointer">
                <input type="radio" name="et-status" value="todo" className="peer sr-only" />
                <span className="badge badge-todo peer-checked:ring-2 peer-checked:ring-red-300 peer-checked:ring-offset-1">À faire</span>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="et-status" value="progress" className="peer sr-only" />
                <span className="badge badge-progress peer-checked:ring-2 peer-checked:ring-amber-300 peer-checked:ring-offset-1">En cours</span>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="et-status" value="done" className="peer sr-only" />
                <span className="badge badge-done peer-checked:ring-2 peer-checked:ring-emerald-300 peer-checked:ring-offset-1">Terminée</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn-dark">Enregistrer</button>
        </form>
      </div>
    </dialog>
  )
}