"use server";

import { updateTaskFormSchema } from '@/app/lib/definitions'
import { redirect } from 'next/navigation';
import getSessionCookie from '../lib/get-session-cookie';
import { tasksUpdate } from '@/services/api';

// title,
// description,
// status,
// priority, NO
// dueDate,
// assigneeIds,

export async function updateTask(state, formData) {

  console.log(formData);

  // Validate form fields
  const validatedFields = updateTaskFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    dueDate: formData.get('dueDate'),
    assigneeIds: formData.getAll('assigneeIds'),
    status: formData.get('status'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // get the token from the session
  const session = await getSessionCookie();
  const token = session.apiToken;

  // récupération de l'id de la tâche
  const taskId = formData.get('taskId');
  // récupération de l'id du projet
  const projectId = formData.get('projectId');

  // Call the API provider or db to create a project...
  const responseData = await tasksUpdate(projectId, taskId, {
    title: formData.get('title'),
    description: formData.get('description'),
    dueDate: formData.get('dueDate'),
    assigneeIds: formData.getAll('assigneeIds'),
    status: formData.get('status'),
  }, token);  
  
  // 5. Redirect to project page
  redirect('/projects/' + projectId);
}