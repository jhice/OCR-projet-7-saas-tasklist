"use server";

import { createProjectFormSchema } from '@/app/lib/definitions'
import { projectsUpdate } from '@/services/api'
import { redirect } from 'next/navigation';
import getSessionCookie from '../lib/get-session-cookie';

export async function updateProject(state, formData) {
  // Validate form fields
  const validatedFields = createProjectFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    contributors: formData.getAll('contributors'),
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

  // Call the API provider or db to create a project...
  const projectId = formData.get('id');
  const responseData = await projectsUpdate(projectId, {
    name: formData.get('name'),
    description: formData.get('description'),
    contributors: formData.getAll('contributors'),
  }, token);

  // 5. Redirect to project page
  redirect('/projects/' + projectId);
}