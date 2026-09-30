"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import getSessionCookie from '../lib/get-session-cookie';
import { projectsDelete } from '@/services/api';

// Appelée directement depuis project-full (pas via un <form>) : renvoie { error } ou redirige
export async function deleteProject(projectId) {

  // get the token from the session
  const session = await getSessionCookie();
  const token = session.apiToken;

  try {
    await projectsDelete(projectId, token);
  } catch (error) {
    // message de l'API (ex. pas propriétaire du projet) affiché sous l'en-tête
    return { error: error.message };
  }

  // Rafraîchit la liste des projets puis y redirige (hors try : redirect() lève une exception)
  revalidatePath('/projects');
  redirect('/projects');
}
