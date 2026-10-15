import "server-only";
import { forbidden, notFound, redirect } from "next/navigation";

/**
 * Traduit une ApiError en page Next.js adaptée, sinon relance l'erreur
 * Lancée dans un try/catch depuis page.js, projects/page.js, projects/[id]/page.js, account/page.js
 * (rattrapée par app/error.js).
 */
export default function handleApiError(error) {
  // token invalide ou utilisateur supprimé (ex. nouveau seed) => on vide la session
  if (error.status === 401) redirect("/logout");
  // ni admin ni contributeur du projet => page 403 (app/forbidden.js)
  if (error.status === 403) forbidden();
  // ressource inexistante => page 404 (app/not-found.js)
  if (error.status === 404) notFound();
  // dans tous les autres cas (app/error.js)
  throw error;
}
