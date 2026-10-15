/**
 * Helpers
 */

import { projectsIdTasks } from "./api-bridge";

/**
 * Retourne les initiales d'un utilisateurs
 */
export function getNameInitials(name) {
  const splitName = name.split(" ");
  const firstLetter = splitName[0].substring(0, 1);
  // nom en un seul mot : pas de seconde initiale
  const secondLetter = (splitName[1] ?? "").substring(0, 1);
  return firstLetter + secondLetter;
}

/**
 * Statuts des tâches
 */
export const TASK_STATUS = {
  "TODO": "À faire",
  "IN_PROGRESS": "En cours",
  "DONE": "Terminée",
};

/**
 * Modales
 */

export function showModal(e) {
  // useRef ? Hook problem
  const dialog = document.getElementById(e.currentTarget.dataset.modalOpen);
  if (dialog) dialog.showModal();
  // setModalOpened(true);
}

export function closeModal(e) {
  const dialog = document.getElementById(e.currentTarget.dataset.modalClose);
  if (dialog) dialog.close();
  // setModalOpened(false);
}

export function cardCloseModal(e) {
  if (e.target.className === "modal-card") {
    const dialog = document.getElementById(e.currentTarget.dataset.modalClose);
    if (dialog) {
      dialog.close();
    };
    // setModalOpened(false);
  }
}

/**
 * Options des tâches (dropdown géré par HTML/details)
 */

// Fermeture des menus au clic sur le document
export function closeOptionsMenu(e) {
  document.querySelectorAll("details.dropdown[open]").forEach((dropdown) => {
    if (!dropdown.contains(e.target) || e.target.closest(".dropdown-item")) {
      dropdown.removeAttribute("open");
    }
  });
}

// Clavier : Échap ferme le menu et rend le focus au bouton d'options
export function closeOptionsMenuOnEscape(e) {
  const dropdown = e.currentTarget;
  if (e.key === "Escape" && dropdown.open) {
    dropdown.removeAttribute("open");
    dropdown.querySelector("summary")?.focus();
  }
}

// Clavier : le focus quitte le menu (Tab) => fermeture
// relatedTarget null (clic souris sans focus, ex. Safari) : on laisse closeOptionsMenu gérer
export function closeOptionsMenuOnBlur(e) {
  const dropdown = e.currentTarget;
  if (e.relatedTarget && !dropdown.contains(e.relatedTarget)) {
    dropdown.removeAttribute("open");
  }
}

/**
 * Personnes assignables à une tâche : propriétaire + membres du projet, sans doublon
 * @returns {object[]} [{ id, name, email }]
 */
export function getProjectMembers(project) {
  // project.owner est le propriétaire du projet
  // ... (spread) ajoute les utilisateurs du projet
  const users = [project.owner, ...project.members.map(member => member.user)];
  // supprime les doublons (si propriétaire a été ajouté plusieurs fois - l'API ne devrait pas le permettre)
  return users.filter((user, index) => users.findIndex(u => u.id === user.id) === index);
}

/**
 * Progression des projets fournis (total tâches, tâches terminées, pourcentage de progression)
 */
export async function getProjectsStats(projectsData, apiToken) {
  // objet qui contiendra les données finales
  const projectsTasks = {};
  // pour chaque projet fourni
  for (const project of projectsData) {
    const projectData = await projectsIdTasks(project.id, apiToken);
    // nombre de tâches totales
    const totalTasks = projectData.data.tasks.length;
    // nombre de tâches terminées
    const doneTasks = projectData.data.tasks.filter(t => t.status === "DONE");
    const totalDoneTasks = doneTasks.length;
    // progression en %
    const progressionPercent = totalTasks ? Math.round((totalDoneTasks / totalTasks) * 100) : 0;
    // store for later use
    projectsTasks[project.id] = {
      totalTasks,
      totalDoneTasks,
      progressionPercent,
    };
  };
  return projectsTasks;
}