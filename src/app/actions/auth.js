"use server";

import { SignupFormSchema } from "@/app/lib/definitions";
import { register } from "@/services/api";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import z from "zod";

/**
 * Server action : inscription
 * @param {object} state Etat de l'action, utile pour les erreurs remontées au formulaire
 * @param {object} formData Les données reçues du formulaire
 * @returns RedirectType|{errors}
 */
export async function signup(state, formData) {

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  try {

    // Call the API provider or db to create a user...
    const responseData = await register({
      "email": formData.get("email"),
      "password": formData.get("password"),
      "name": formData.get("name"),
    });

    await createSession(responseData.data.user.id, responseData.data.user.name, responseData.data.user.email, responseData.data.token);

  } catch (error) {
    return {
      errors: {
        register: [error.message],
      }
    };
  }
  // 5. Redirect user
  redirect("/");
}