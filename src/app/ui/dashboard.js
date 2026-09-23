"use client";

import { useState } from "react";

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

  console.log(showKanban, tasks);

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
          {/* Task row (répété) */}
          <article className="task-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-todo">À faire</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
            </div>
            <a href="task.html" className="btn-dark shrink-0 self-start sm:self-center">Voir</a>
          </article>

          <article className="task-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-progress">En cours</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
            </div>
            <a href="task.html" className="btn-dark shrink-0 self-start sm:self-center">Voir</a>
          </article>

          <article className="task-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-todo">À faire</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
            </div>
            <a href="task.html" className="btn-dark shrink-0 self-start sm:self-center">Voir</a>
          </article>

          <article className="task-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-todo">À faire</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
            </div>
            <a href="task.html" className="btn-dark shrink-0 self-start sm:self-center">Voir</a>
          </article>

          <article className="task-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-todo">À faire</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
            </div>
            <a href="task.html" className="btn-dark shrink-0 self-start sm:self-center">Voir</a>
          </article>

          <article className="task-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-todo">À faire</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
            </div>
            <a href="task.html" className="btn-dark shrink-0 self-start sm:self-center">Voir</a>
          </article>
        </div>
      </section>

      {/* Vue Kanban */}
      <section id="view-kanban" className={"mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 " + (showKanban ? 'active' : 'hidden')}>
        <div className="panel p-5">
          <div className="kanban-column-header">
            À faire <span className="count-pill">4</span>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-todo">À faire</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>

            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-todo">À faire</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>

            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-todo">À faire</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>

            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-todo">À faire</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>
          </div>
        </div>

        <div className="panel p-5">
          <div className="kanban-column-header">
            En cours <span className="count-pill">4</span>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-progress">En cours</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>

            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-progress">En cours</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>

            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-progress">En cours</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>

            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-progress">En cours</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>
          </div>
        </div>

        <div className="panel p-5">
          <div className="kanban-column-header">
            Terminées <span className="count-pill">4</span>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-done">Terminée</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>

            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-done">Terminée</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>

            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-done">Terminée</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>

            <article className="task-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">Nom de la tâche</h3>
                <span className="badge badge-done">Terminée</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Description de la tâche</p>
              <div className="task-meta mt-3">
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                  Nom du projet
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v8.5A2.25 2.25 0 0115.5 17h-11a2.25 2.25 0 01-2.25-2.25v-8.5A2.25 2.25 0 014.5 4H5V2.75A.75.75 0 015.75 2zM4.5 8.5v6.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8.5h-12.5z" clipRule="evenodd" /></svg>
                  9 mars
                </span>
                <span className="task-meta-sep">|</span>
                <span className="task-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15H9.06l-3.56 3.06A.75.75 0 014 17.5V15h-.25A2.25 2.25 0 011.5 12.75v-8.5z" clipRule="evenodd" /></svg>
                  2
                </span>
              </div>
              <a href="task.html" className="btn-dark mt-4 inline-flex">Voir</a>
            </article>
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