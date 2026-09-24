"use server";

import { UserUpdateFormSchema, UserUpdateFormSchemaNoPassword } from '@/app/lib/definitions'
import { apiUserPassword, apiUserUpdate } from '@/services/api';
import { redirect } from 'next/navigation';
import getSessionCookie from '../lib/get-session-cookie';

export async function userUpdate(state, formData) {

  console.log(formData);

  // With or without a password
  let validatedFields;

  if (formData.get('newPassword')) {
    // Validate form fields
    validatedFields = UserUpdateFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('newPassword'),
    });
  } else {
    // Validate form fields
    validatedFields = UserUpdateFormSchemaNoPassword.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
    });
  }

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // get the token from the session
  const session = await getSessionCookie();
  const token = session.apiToken;

  // Call the API provider or db to update a user...
  let responseData;
  // With or without a password
  if (formData.get('newPassword')) {
    // password
    console.log("ici", formData.get('newPassword'));
    // user info
    responseData = await apiUserUpdate({
      "email": formData.get('email'),
      "name": formData.get('name'),
    }, token);
    // password
    responseData = await apiUserPassword({
      "currentPassword": formData.get('password'), // P@ssword123
      "newPassword": formData.get('newPassword'), // P@ssword123!!!
    }, token);
  } else {
    // no password
    responseData = await apiUserUpdate({
      "email": formData.get('email'),
      "name": formData.get('name'),
    }, token);
  }

  // Redirect user
  redirect('/account');
}