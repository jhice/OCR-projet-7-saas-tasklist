"use server";

import { SigninFormSchema } from "../lib/definitions";
import { login } from "../lib/api-bridge";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";
import z from "zod";

/**
 * Server action : connexion
 * @param {object} state Etat de l'action, utile pour les erreurs remontées au formulaire
 * @param {object} formData Les données reçues du formulaire
 * @returns RedirectType|{errors}
 */
export async function signin(state, formData) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    // exemple de retour généré/attendu
    // {
    //   errors: {
    //     email: [ 'Veuillez saisir une e-mail valide.' ],
    //     password: [
    //       'Au moins 8 caractères.',
    //       'Au moins un chiffre.',
    //       'Au moins un caractère spécial.'
    //     ]
    //   }
    // }
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  // Call the provider or db to create a user...
  try {

    const responseData = await login({
      "email": formData.get("email"),
      "password": formData.get("password"),
    });

    await createSession(responseData.data.user.id, responseData.data.user.name, responseData.data.user.email, responseData.data.token);

  } catch (error) {
    return {
      errors: {
        login: [error.message],
      }
    };
  }

  // 5. Redirect user
  redirect("/");
}