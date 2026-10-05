import "server-only";
import { forbidden, notFound, redirect } from "next/navigation";

/**
 * Traduit une ApiError en page Next.js adaptée, sinon relance l'erreur
 * (rattrapée par src/app/error.js).
 * redirect(), forbidden() et notFound() lèvent une exception interne à Next.js :
 * on peut donc les appeler depuis un catch.
 */
export default function handleApiError(error) {
  console.log(error);
  
  // token invalide ou utilisateur supprimé (ex. nouveau seed) => on vide la session
  if (error.status === 401) redirect("/logout");
  // ni admin ni contributeur du projet => page 403 (src/app/forbidden.js)
  if (error.status === 403) forbidden();
  // ressource inexistante => page 404 (src/app/not-found.js)
  if (error.status === 404) notFound();
  throw error;
}
