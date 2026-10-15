"use server";

import { UserUpdateFormSchema, UserUpdateFormSchemaNoPassword } from "../lib/definitions";
import { apiUserPassword, apiUserUpdate } from "../lib/api-bridge";
import { redirect } from "next/navigation";
import getSessionCookie from "../lib/get-session-cookie";
import z from "zod";

/**
 * Server action : mise à jour compte utilisateur
 * @param {object} state Etat de l'action, utile pour les erreurs remontées au formulaire
 * @param {object} formData Les données reçues du formulaire
 * @returns RedirectType|{errors}
 */
export async function userUpdate(state, formData) {

  // With or without a password
  let validatedFields;

  if (formData.get("newPassword")) {
    // Validate form fields
    validatedFields = UserUpdateFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      newPassword: formData.get("newPassword"),
    });
  } else {
    // Validate form fields
    validatedFields = UserUpdateFormSchemaNoPassword.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
    });
  }

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  // get the token from the session
  const session = await getSessionCookie();
  const token = session.apiToken;

  // Call the API provider or db to update a user...
  // With or without a password
  if (formData.get("newPassword")) {
    // password
    // user info
    await apiUserUpdate({
      "email": formData.get("email"),
      "name": formData.get("name"),
    }, token);

    try {
      // password
      await apiUserPassword({
        "currentPassword": formData.get("password"),
        "newPassword": formData.get("newPassword"),
      }, token);
    } catch (error) {
      return {
        errors: {
          update: [error.message],
        }
      };
    }
  } else {
    // no password
    await apiUserUpdate({
      "email": formData.get("email"),
      "name": formData.get("name"),
    }, token);
  }

  // Redirect user
  redirect("/account");
}