"use server";

import {  createTaskFormSchema } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import getSessionCookie from "../lib/get-session-cookie";
import { tasksCreate } from "@/services/api";
import z from "zod";

/**
 * Server action : création de tâche
 * @param {object} state Etat de l'action, utile pour les erreurs remontées au formulaire
 * @param {object} formData Les données reçues du formulaire
 * @returns RedirectType|{errors}
 */
export async function createTask(state, formData) {

  // Validate form fields
  const validatedFields = createTaskFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate"),
    assigneeIds: formData.getAll("assigneeIds"),
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

  // récupération de l'id du projet
  const projectId = formData.get("projectId");

  // Call the API provider or db to create a project...
  await tasksCreate(projectId, {
    title: formData.get("title"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate"),
    assigneeIds: formData.getAll("assigneeIds"),
  }, token);  
  
  // 5. Redirect to project page
  redirect("/projects/" + projectId);
}