"use server";

import { SignupFormSchema } from '@/app/lib/definitions'
import { register } from '@/services/api'
import { createSession } from '@/app/lib/session'
import { redirect } from 'next/navigation';

export async function signup(state, formData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Call the provider or db to create a user...
  const responseData = await register({
    "email": formData.get('email'),
    "password": formData.get('password'), // P@ssword123
    "name": formData.get('name'),
  });

  await createSession(responseData.data.user.id, responseData.data.user.name, responseData.data.user.email, responseData.data.token);
  // 5. Redirect user
  redirect('/');
}