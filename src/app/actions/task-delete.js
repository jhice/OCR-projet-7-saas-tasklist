"use server";

import { revalidatePath } from "next/cache";
import getSessionCookie from "../lib/get-session-cookie";
import { tasksDelete } from "@/services/api";

// Appelée directement depuis project-full (pas via un <form>) : renvoie { error } ou { success }
export async function deleteTask(projectId, taskId) {

  // get the token from the session
  const session = await getSessionCookie();
  const token = session.apiToken;

  try {
    await tasksDelete(projectId, taskId, token);
  } catch (error) {
    return { error: error.message };
  }

  // Rafraîchit la page projet (la tâche disparaît de la liste)
  revalidatePath("/projects/" + projectId);
  return { success: true };
}
