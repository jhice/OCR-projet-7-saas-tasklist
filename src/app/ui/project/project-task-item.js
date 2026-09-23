"use client";

import { cardCloseModal, closeModal, getNameInitials, showModal, TASK_STATUS } from "@/services/helpers";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

export default function TaskItem({ project, tasks }) {

  return (
    <>
      {/* En-tête projet */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <Link href="/projects" className="icon-btn shrink-0" aria-label="Retour aux projets">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-2xl font-bold text-ink">{project.name}</h1>
              <button type="button" className="auth-link text-sm" data-modal-open="modal-edit-project" onClick={(e) => showModal(e)}>Modifier</button>
            </div>
            <p className="mt-2 text-gray-500">{project.description}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button type="button" className="btn-dark" data-modal-open="modal-create-task" onClick={(e) => showModal(e)}>Créer une tâche</button>
          {/* <button type="button" className="btn-accent">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10 2c.4 2.4 1.5 3.9 4 4.3-2.5.4-3.6 1.9-4 4.3-.4-2.4-1.5-3.9-4-4.3 2.5-.4 3.6-1.9 4-4.3z" />
              <path d="M15.5 12c.24 1.36.86 2.2 2.3 2.43-1.44.23-2.06 1.07-2.3 2.43-.24-1.36-.86-2.2-2.3-2.43 1.44-.23 2.06-1.07 2.3-2.43z" />
            </svg>
            IA
          </button> */}
        </div>
      </div>

      {/* Contributeurs */}
      <div className="contributors-panel mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-semibold text-ink">Contributeurs</span>
          <span className="ml-2 text-sm text-gray-500">{project.members.length} personne(s)</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {project.members.map(member =>
            <span key={member.id} className="inline-flex items-center">
              {member.role === "ADMIN" ? (
                <>
                  <span className="avatar-sm brand">{getNameInitials(member.user.name)}</span>
                  <span className="name-pill brand">Propriétaire</span>
                </>
              ) : (
                <>
                  <span className="avatar-sm">{getNameInitials(member.user.name)}</span>
                  <span className="name-pill">{member.user.name}</span>
                </>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Tâches */}
      <section className="panel mt-6 p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink">Tâches</h2>
            <p className="text-sm text-gray-500">Par ordre de priorité</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="segmented" role="tablist">
              <button type="button" className="segmented-btn active" role="tab" aria-selected="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Liste
              </button>
              <button type="button" className="segmented-btn" role="tab" aria-selected="false">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" />
                </svg>
                Calendrier
              </button>
            </div>

            <div className="select-wrap">
              <select className="select-field">
                <option value="">Statut</option>
                <option value="todo">À faire</option>
                <option value="progress">En cours</option>
                <option value="done">Terminée</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="select-caret h-4 w-4">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
              </svg>
            </div>

            <div className="search-input-wrap w-full sm:w-64">
              <input type="search" placeholder="Rechercher une tâche" className="search-input" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon h-4 w-4">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Liste des tâches */}
        <div className="mt-6 flex flex-col gap-4">

          {/* Tâche (répétée) */}
          {tasks.map(task =>
            <article key={task.id} className="task-card">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold text-ink">{task.title}</h3>
                    <span className={"badge badge-" + task.status.toLowerCase()}>{TASK_STATUS[task.status]}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                </div>
                <button type="button" className="icon-btn h-10 w-10 shrink-0" aria-label="Options de la tâche" data-modal-open="modal-edit-task" onClick={(e) => showModal(e)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM14 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                </button>
              </div>

              <div className="task-meta mt-4">
                <span>Échéance :</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  {format(task.dueDate, "d LLLL y", {locale: fr})}
                </span>
              </div>

              <div className="task-meta mt-3">
                <span>Assigné à :</span>
                {task.assignees.map(assignee =>
                  <span key={assignee.id} className="inline-flex items-center">
                    <span className="avatar-sm">{getNameInitials(assignee.user.name)}</span>
                    <span className="name-pill">{assignee.user.name}</span>
                  </span>
                )}
              </div>

              <div className="mt-4 flex w-full items-center justify-between border-t border-gray-100 pt-3 text-sm font-medium text-ink">
                Commentaires ({task.comments.length})
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gray-400">
                  <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 9.06l-3.71 3.71a.75.75 0 11-1.06-1.06l4.24-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 01-.02 1.08z" clipRule="evenodd" />
                </svg>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* Modale : créer une tâche */}
      <dialog id="modal-create-task" data-modal-close="modal-create-task" className="modal-card" onClick={(e) => cardCloseModal(e)}>
        <div className="relative p-6 sm:p-8">
          <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-create-task" aria-label="Fermer" onClick={(e) => closeModal(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>

          <h2 className="font-heading text-2xl font-bold text-ink">Créer une tâche</h2>

          <form className="mt-6 flex flex-col gap-6">
            <div>
              <label htmlFor="ct-title" className="auth-label">Titre*</label>
              <input id="ct-title" name="title" type="text" required autoFocus className="auth-input" />
            </div>

            <div>
              <label htmlFor="ct-desc" className="auth-label">Description*</label>
              <textarea id="ct-desc" name="description" rows="2" required className="auth-input"></textarea>
            </div>

            <div>
              <label htmlFor="ct-due" className="auth-label">Échéance*</label>
              <div className="search-input-wrap">
                <input id="ct-due" name="due" type="text" placeholder="jj/mm/aaaa" required className="search-input" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon h-4 w-4">
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div>
              <label className="auth-label">Assigné à :</label>
              <div className="search-input-wrap">
                <button type="button" className="search-input w-full text-left text-gray-400">Choisir un ou plusieurs collaborateurs</button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon h-4 w-4">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
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

            <button type="submit" className="btn-dark" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
              </svg>
              Ajouter une tâche
            </button>
          </form>
        </div>
      </dialog>

      {/* Modale : modifier une tâche */}
      <dialog id="modal-edit-task" data-modal-close="modal-edit-task" className="modal-card" onClick={(e) => cardCloseModal(e)}>
        <div className="relative p-6 sm:p-8">
          <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-edit-task" aria-label="Fermer" onClick={(e) => closeModal(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>

          <h2 className="font-heading text-2xl font-bold text-ink">Modifier</h2>

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

            <button type="submit" className="btn-dark" disabled>Enregistrer</button>
          </form>
        </div>
      </dialog>

      {/* Modale : modifier un projet */}
      <dialog id="modal-edit-project" data-modal-close="modal-edit-project" className="modal-card" onClick={(e) => cardCloseModal(e)}>
        <div className="relative p-6 sm:p-8">
          <button type="button" className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" data-modal-close="modal-edit-project" aria-label="Fermer" onClick={(e) => closeModal(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>

          <h2 className="font-heading text-2xl font-bold text-ink">Modifier un projet</h2>

          <form className="mt-6 flex flex-col gap-6">
            <div>
              <label htmlFor="ep-title" className="auth-label">Titre*</label>
              <input id="ep-title" name="title" type="text" placeholder="Nom du projet" required autoFocus className="auth-input" />
            </div>

            <div>
              <label htmlFor="ep-desc" className="auth-label">Description*</label>
              <textarea id="ep-desc" name="description" rows="2" placeholder="Développement de la nouvelle version de l'API REST avec authentification JWT" required className="auth-input"></textarea>
            </div>

            <div>
              <label className="auth-label">Contributeurs</label>
              <div className="search-input-wrap">
                <button type="button" className="search-input w-full text-left text-gray-400">2 collaborateurs</button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon h-4 w-4">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <button type="submit" className="btn-dark" disabled>Enregistrer</button>
          </form>
        </div>
      </dialog>

    </>
  )
}
