"use server";

import { updateProjectFormSchema } from "../lib/definitions";
import { projectsUpdate } from "../lib/api-bridge";
import { redirect } from "next/navigation";
import getSessionCookie from "../lib/get-session-cookie";
import z from "zod";

/**
 * Server action : mise à jour projet
 * @param {object} state Etat de l'action, utile pour les erreurs remontées au formulaire
 * @param {object} formData Les données reçues du formulaire
 * @returns RedirectType|{errors}
 */
export async function updateProject(state, formData) {
  // Validate form fields
  const validatedFields = updateProjectFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  // get the token from the session
  const session = await getSessionCookie();
  const token = session.apiToken;

  // Call the API provider or db to create a project...
  const projectId = formData.get("id");
  try {
    await projectsUpdate(projectId, {
      name: formData.get("name"),
      description: formData.get("description"),
    }, token);
  } catch (error) {
    // message de l'API (ex. pas les droits d'admin) affiché dans la modale
    return {
      errors: {
        update: [error.message],
      }
    };
  }

  // 5. Redirect to project page
  redirect("/projects/" + projectId);
}