"use server";

import { createCommentFormSchema } from '@/app/lib/definitions'
import { revalidatePath } from 'next/cache';
import getSessionCookie from '../lib/get-session-cookie';
import { commentsCreate } from '@/services/api';

// content
// task
// author

export async function createComment(state, formData) {

  // get the session (token + auteur du commentaire)
  const session = await getSessionCookie();
  const token = session.apiToken;

  // récupération des ids du projet et de la tâche
  const projectId = formData.get('projectId');
  const taskId = formData.get('taskId');

  // Validate form fields
  const validatedFields = createCommentFormSchema.safeParse({
    content: formData.get('content'),
    task: taskId,
    author: session.userId,
  })

  // If any form fields are invalid, return early
  // taskId renvoyé pour n'afficher l'erreur que sous le formulaire de cette tâche
  if (!validatedFields.success) {
    return {
      taskId,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Call the API provider or db to create a comment...
  // l'API déduit la tâche de l'URL et l'auteur du token : seul content est envoyé
  let responseData;
  try {
    responseData = await commentsCreate(projectId, taskId, {
      content: validatedFields.data.content,
    }, token);
  } catch (error) {
    return {
      taskId,
      errors: {
        content: [error.message],
      }
    }
  }

  // Rafraîchit les données de la page projet (pas de redirect, pour garder le state :
  // taskId permet de garder ouverts les commentaires de la tâche concernée)
  revalidatePath('/projects/' + projectId);

  return {
    taskId,
    success: true,
  }
}
