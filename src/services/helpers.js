/**
 * Helpers
 */

/**
 * returns user nam initials
 */
export function getNameInitials(name) {
  const splitName = name.split(" ");
  const firstLetter = splitName[0].substring(0, 1);
  const secondLetter = splitName[1].substring(0, 1);
  return firstLetter + secondLetter;
}

/**
 * task status
 */
export const TASK_STATUS = {
  "TODO": "À faire",
  "IN_PROGRESS": "En cours",
  "DONE": "Terminée",
}

/**
 * modals
 */

export function showModal(e) {
  // console.log(e.currentTarget);
  // useRef ? Hook problem
  const dialog = document.getElementById(e.currentTarget.dataset.modalOpen);
  if (dialog) dialog.showModal();
  // setModalOpened(true);
}

export function closeModal(e) {
  // console.log(e.currentTarget);
  const dialog = document.getElementById(e.currentTarget.dataset.modalClose);
  if (dialog) dialog.close();
  // setModalOpened(false);
}

export function cardCloseModal(e) {
  // console.log(e.target.className);
  if (e.target.className === "modal-card") {
    const dialog = document.getElementById(e.currentTarget.dataset.modalClose);
    if (dialog) {
      dialog.close()
    };
    // setModalOpened(false);
  }
}

// click on document body
export function closeOptionsMenu(e) {
  // console.log(e.target.className);
  document.querySelectorAll("details.dropdown[open]").forEach((dropdown) => {
    if (!dropdown.contains(e.target) || e.target.closest(".dropdown-item")) {
      dropdown.removeAttribute("open");
    }
  });
}