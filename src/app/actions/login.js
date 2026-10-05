"use server";

import { SigninFormSchema } from "@/app/lib/definitions";
import { login } from "@/services/api";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

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
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
  try {

    const responseData = await login({
      "email": formData.get("email"),
      "password": formData.get("password"), // P@ssword123
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