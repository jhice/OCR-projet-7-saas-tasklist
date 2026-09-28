"use server";

import { contributorFormSchema } from '@/app/lib/definitions'
import { projectsAddContributor, projectsRemoveContributor, usersSearch } from '@/services/api';
import { revalidatePath } from 'next/cache';
import getSessionCookie from '../lib/get-session-cookie';

// Appelées directement depuis les composants (pas via un <form>),
// elles renvoient { error } ou un résultat, sans redirect.

/**
 * Recherche un utilisateur existant par son email exact
 * (création de projet : les contributeurs ne sont envoyés qu'au submit)
 */
export async function findUserByEmail(email) {

  // Validate email
  const validatedFields = contributorFormSchema.safeParse({ email });
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.email[0] };
  }

  // get the token from the session
  const session = await getSessionCookie();
  const token = session.apiToken;

  const searchedEmail = validatedFields.data.email.toLowerCase();

  let responseData;
  try {
    responseData = await usersSearch(searchedEmail, token);
  } catch (error) {
    return { error: error.message };
  }

  // la recherche API est partielle (contains) : on garde la correspondance exacte
  const user = responseData.data.users.find(user => user.email.toLowerCase() === searchedEmail);
  if (!user) {
    return { error: 'Aucun utilisateur avec cet e-mail.' };
  }

  return { user };
}

/**
 * Ajoute un contributeur à un projet existant
 */
export async function addContributor(projectId, email) {

  // Validate email
  const validatedFields = contributorFormSchema.safeParse({ email });
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.email[0] };
  }

  // get the token from the session
  const session = await getSessionCookie();
  const token = session.apiToken;

  try {
    await projectsAddContributor(projectId, { email: validatedFields.data.email }, token);
  } catch (error) {
    return { error: error.message };
  }

  // Rafraîchit la page projet (liste des membres)
  revalidatePath('/projects/' + projectId);
  return { success: true };
}

/**
 * Retire un contributeur d'un projet existant
 */
export async function removeContributor(projectId, userId) {

  // get the token from the session
  const session = await getSessionCookie();
  const token = session.apiToken;

  try {
    await projectsRemoveContributor(projectId, userId, token);
  } catch (error) {
    return { error: error.message };
  }

  // Rafraîchit la page projet (liste des membres)
  revalidatePath('/projects/' + projectId);
  return { success: true };
}
