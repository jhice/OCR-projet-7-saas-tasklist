"use client";

import { useState } from "react";
import TaskListItem from "./task/task-list-item";
import TaskKanbanItem from "./task/task-list-kanban";

const TASK_STATUS = {
  "TODO": "À faire",
  "IN_PROGRESS": "En cours",
  "DONE": "Terminée",
}

export default function Dashboard({ session, tasks }) {

  const [showKanban, setShowKanban] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  function showModal(e) {
    // console.log(e.currentTarget);
    const dialog = document.getElementById(e.currentTarget.dataset.modalOpen);
    if (dialog) dialog.showModal();
    setModalOpened(true);
  }

  function closeModal(e) {
    // console.log(e.currentTarget);
    const dialog = document.getElementById(e.currentTarget.dataset.modalClose);
    if (dialog) dialog.close();
    setModalOpened(false);
  }

  function cardCloseModal(e) {
    // console.log(e.target.className);
    if (e.target.className === "modal-card") {
      const dialog = document.getElementById(e.currentTarget.dataset.modalClose);
      if (dialog) {
        dialog.close()
      };
      setModalOpened(false);
    }
  }

  /* tasks */

  const todoTasks = tasks.filter(t => t.status === "TODO");
  const inProgressTasks = tasks.filter(t => t.status === "IN_PROGRESS");
  const doneTasks = tasks.filter(t => t.status === "DONE");
  console.log(todoTasks, inProgressTasks, doneTasks);

  return (
    <>
      {/* page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-ink">Tableau de bord</h1>
          <p className="mt-2 text-gray-500">Bonjour {session.userName}, voici un aperçu de vos projets et tâches</p>
        </div>
        <button type="button" className="btn-dark" data-modal-open="modal-create-project" onClick={(e) => showModal(e)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
          </svg>
          Créer un projet
        </button>
      </div>

      {/* Toggle Liste / Kanban */}
      <div className="segmented mt-8" role="tablist">
        <button type="button" className={"segmented-btn " + (showKanban ? '' : 'active')} data-view-tab="list" role="tab" aria-selected={!showKanban} onClick={() => setShowKanban(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
          Liste
        </button>
        <button type="button" className={"segmented-btn " + (showKanban ? 'active' : '')} data-view-tab="kanban" role="tab" aria-selected={showKanban} onClick={() => setShowKanban(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M5.75 3a2 2 0 00-2 2v10a2 2 0 002 2h8.5a2 2 0 002-2V5a2 2 0 00-2-2h-8.5zM5.5 5.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25v2.5a.25.25 0 01-.25.25h-2.5a.25.25 0 01-.25-.25v-2.5zm5 0a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25v6.5a.25.25 0 01-.25.25h-2.5a.25.25 0 01-.25-.25v-6.5zm-5 5a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25v1.5a.25.25 0 01-.25.25h-2.5a.25.25 0 01-.25-.25v-1.5z" clipRule="evenodd" />
          </svg>
          Kanban
        </button>
      </div>

      {/* Vue Liste */}
      <section id="view-list" className={"panel mt-6 p-6 sm:p-8 " + (showKanban ? 'hidden' : 'active')}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink">Mes tâches assignées</h2>
            <p className="text-sm text-gray-500">Par ordre de priorité</p>
          </div>
          <div className="search-input-wrap w-full sm:w-80">
            <input type="search" placeholder="Rechercher une tâche" className="search-input" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon h-4 w-4">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {/* Task list item */}
          {tasks.map(task => <TaskListItem key={task.id} task={task} TASK_STATUS={TASK_STATUS} />)}
        </div>
      </section>

      {/* Vue Kanban */}
      <section id="view-kanban" className={"mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 " + (showKanban ? 'active' : 'hidden')}>
        {/* TODO */}
        <div className="panel p-5">
          <div className="kanban-column-header">
            À faire <span className="count-pill">{todoTasks.length}</span>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {todoTasks.map(task => <TaskKanbanItem key={task.id} task={task} TASK_STATUS={TASK_STATUS} />)}
          </div>
        </div>
        {/* IN_PROGRESS */}
        <div className="panel p-5">
          <div className="kanban-column-header">
            En cours <span className="count-pill">{inProgressTasks.length}</span>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {inProgressTasks.map(task => <TaskKanbanItem key={task.id} task={task} TASK_STATUS={TASK_STATUS} />)}
          </div>
        </div>
        {/* DONE */}
        <div className="panel p-5">
          <div className="kanban-column-header">
            Terminées <span className="count-pill">{doneTasks.length}</span>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {doneTasks.map(task => <TaskKanbanItem key={task.id} task={task} TASK_STATUS={TASK_STATUS} />)}
          </div>
        </div>
      </section>

      {/* Modale : créer un projet */}
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
    </>
  )
}