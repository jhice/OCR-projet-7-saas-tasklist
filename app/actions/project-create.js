"use server";

import { createProjectFormSchema } from "../lib/definitions";
import { projectsCreate } from "../lib/api-bridge";
import { redirect } from "next/navigation";
import getSessionCookie from "../lib/get-session-cookie";
import z from "zod";

/**
 * Server action : création de projet
 * @param {object} state Etat de l'action, utile pour les erreurs remontées au formulaire
 * @param {object} formData Les données reçues du formulaire
 * @returns RedirectType|{errors}
 */
export async function createProject(state, formData) {
  // Validate form fields
  const validatedFields = createProjectFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    contributors: formData.getAll("contributors"),
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
  const responseData = await projectsCreate({
    name: formData.get("name"),
    description: formData.get("description"),
    contributors: formData.getAll("contributors"),
  }, token);
  
  // récupération de l'id du nouveau projet
  const projectId = responseData.data.project.id;

  // 5. Redirect to project page
  redirect("/projects/" + projectId);
}