"use client";

import { getNameInitials } from "@/services/helpers";
import { showModal } from "@/services/helpers";
import ProjectCreateModal from "./project/project-create-modal";

export function ProjectsList({ projects }) {

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-ink">Mes projets</h1>
          <p className="mt-2 text-gray-500">Gérez vos projets</p>
        </div>
        <button type="button" className="btn-dark" data-modal-open="modal-create-project" onClick={(e) => showModal(e)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
          </svg>
          Créer un projet
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {/* Carte projet (répétée) */}
        {projects.map(project => (
          <article key={project.id} className="panel flex flex-col gap-5 p-6">
            <a href="project-detail.html" className="block no-underline hover:opacity-80 transition">
              <h2 className="font-semibold text-ink">{project.name}</h2>
              <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            </a>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Progression</span>
                <span className="font-semibold text-ink">xxx%</span>
              </div>
              <div className="progress-track mt-2">
                <div className="progress-fill" style={{ width: '0px' }}></div>
              </div>
              <p className="mt-2 text-xs text-gray-400">0/{project._count.tasks} tâches terminées</p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 100-4 2 2 0 000 4zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                </svg>
                Équipe ({project.members.length})
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {project.members.map(member =>
                  <span key={member.id} className="inline-flex items-center">
                    {member.role === "ADMIN" ? (
                      <>
                        <span className="avatar-sm brand">{getNameInitials(member.user.name)}</span>
                        <span className="name-pill brand">Propriétaire</span>
                      </>
                    ) : (
                      <span className="avatar-sm">{getNameInitials(member.user.name)}</span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <ProjectCreateModal />
    </>
  )
}