"use server";

import { updateProjectFormSchema } from '@/app/lib/definitions';
import { projectsUpdate } from '@/services/api';
import { redirect } from 'next/navigation';
import getSessionCookie from '../lib/get-session-cookie';

export async function updateProject(state, formData) {
  // Validate form fields
  const validatedFields = updateProjectFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // get the token from the session
  const session = await getSessionCookie();
  const token = session.apiToken;

  // Call the API provider or db to create a project...
  const projectId = formData.get('id');
  let responseData;
  try {
    responseData = await projectsUpdate(projectId, {
      name: formData.get('name'),
      description: formData.get('description'),
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
  redirect('/projects/' + projectId);
}