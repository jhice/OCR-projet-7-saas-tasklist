"use server";

import { updateTaskFormSchema } from "@/app/lib/definitions";
import getSessionCookie from "../lib/get-session-cookie";
import { tasksUpdate } from "@/services/api";
import { revalidatePath } from "next/cache";
import z from "zod";

/**
 * Server action : mise à jour d'une tâche
 * @param {object} state Etat de l'action, utile pour les erreurs remontées au formulaire
 * @param {object} formData Les données reçues du formulaire
 * @returns RedirectType|{errors}
 */
export async function updateTask(state, formData) {

  // Validate form fields
  const validatedFields = updateTaskFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate"),
    assigneeIds: formData.getAll("assigneeIds"),
    status: formData.get("status"),
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

  // récupération de l'id de la tâche
  const taskId = formData.get("taskId");
  // récupération de l'id du projet
  const projectId = formData.get("projectId");

  // Call the API provider or db to update the task
  try {
    await tasksUpdate(projectId, taskId, {
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: formData.get("dueDate"),
      assigneeIds: formData.getAll("assigneeIds"),
      status: formData.get("status"),
    }, token);
  } catch (error) {
    return { error: error.message };
  }

  // Rafraîchit la page projet (pas de redirect : on y est déjà, et un redirect
  // vers la même URL sans le #task-xx serait traité comme un simple changement de hash)
  revalidatePath("/projects/" + projectId);
  return { success: true };
}
