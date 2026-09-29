"use client";

import { showModal } from "@/services/helpers";
import ProjectCreateModal from "./project/modal-create-project";
import ProjectCard from "./project/project-card";

export function ProjectsList({ projects, projectsTasks }) {

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
        {projects.map(project => <ProjectCard key={project.id} project={project} projectTask={projectsTasks[project.id]} />)}
      </div>
      <ProjectCreateModal />
    </>
  )
}