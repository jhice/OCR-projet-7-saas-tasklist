import * as z from 'zod'

// P@ssword123

export const SignupFormSchema = z.object({
  name: z
    .string({ error: 'Le nom est requis.' })
    .trim()
    .min(2, { error: 'Le nom doit contenir au moins 2 caractères.' }),
  email: z
    .string({ error: 'L\'e-mail est requis.' })
    .trim()
    .pipe(z.email({ error: 'Veuillez saisir une e-mail valide.' })),
  password: z
    .string({ error: 'Le mot de passe est requis.' })
    .trim()
    .min(8, { error: 'Au moins 8 caractères.' })
    .regex(/[a-zA-Z]/, { error: 'Au moins une lettre.' })
    .regex(/[0-9]/, { error: 'Au moins un chiffre.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Au moins un caractère spécial.',
    }),
})

export const SigninFormSchema = z.object({
  email: z
    .string({ error: 'L\'e-mail est requis.' })
    .trim()
    .pipe(z.email({ error: 'Veuillez saisir une e-mail valide.' })),
  password: z
    .string({ error: 'Le mot de passe est requis.' })
    .trim()
    .min(8, { error: 'Au moins 8 caractères.' })
    .regex(/[a-zA-Z]/, { error: 'Au moins une lettre.' })
    .regex(/[0-9]/, { error: 'Au moins un chiffre.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Au moins un caractère spécial.',
    }),
})

export const UserUpdateFormSchema = z.object({
  name: z
    .string({ error: 'Le nom est requis.' })
    .trim()
    .min(2, { error: 'Le nom doit contenir au moins 2 caractères.' }),
  email: z
    .string({ error: 'L\'e-mail est requis.' })
    .trim()
    .pipe(z.email({ error: 'Veuillez saisir une e-mail valide.' })),
  newPassword: z
    .string({ error: 'Le mot de passe est requis.' })
    .trim()
    .min(8, { error: 'Au moins 8 caractères.' })
    .regex(/[a-zA-Z]/, { error: 'Au moins une lettre.' })
    .regex(/[0-9]/, { error: 'Au moins un chiffre.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Au moins un caractère spécial.',
    }),
});

export const UserUpdateFormSchemaNoPassword = z.object({
  name: z
    .string({ error: 'Le nom est requis.' })
    .trim()
    .min(2, { error: 'Le nom doit contenir au moins 2 caractères.' }),
  email: z
    .string({ error: 'L\'e-mail est requis.' })
    .trim()
    .pipe(z.email({ error: 'Veuillez saisir une e-mail valide.' })),
});

export const createProjectFormSchema = z.object({
  name: z
    .string({ error: 'Le nom du projet est requis.' })
    .trim()
    .nonempty({ error: 'Le nom du projet est requis.' }),
  description: z
    .string({ error: 'La description est requise.' })
    .trim()
    .nonempty({ error: 'La description est requise.' }),
  contributors: z
    .array(z.email(), { error: 'Liste de contributeurs invalide.' }),
});

// les contributeurs d'un projet existant sont gérés à part (POST/DELETE /contributors)
export const updateProjectFormSchema = z.object({
  name: z
    .string({ error: 'Le nom du projet est requis.' })
    .trim()
    .nonempty({ error: 'Le nom du projet est requis.' }),
  description: z
    .string({ error: 'La description est requise.' })
    .trim()
    .nonempty({ error: 'La description est requise.' }),
});

export const contributorFormSchema = z.object({
  email: z
    .string({ error: 'L\'e-mail est requis.' })
    .trim()
    .pipe(z.email({ error: 'Veuillez saisir une e-mail valide.' })),
});

export const createTaskFormSchema = z.object({
  title: z
    .string({ error: 'Le titre est requis.' })
    .trim()
    .nonempty({ error: 'Le titre est requis.' }),
  description: z
    .string({ error: 'La description est requise.' })
    .trim()
    .nonempty({ error: 'La description est requise.' }),
  dueDate: z
    // @link https://zod.dev/api?id=iso-dates#iso-dates
    .iso.date({ error: 'Veuillez saisir une date d\'échéance valide.' }),
  assigneeIds: z
    .array(z.string(), { error: 'Liste des personnes assignées invalide.' }),
});

export const updateTaskFormSchema = z.object({
  title: z
    .string({ error: 'Le titre est requis.' })
    .trim()
    .nonempty({ error: 'Le titre est requis.' }),
  description: z
    .string({ error: 'La description est requise.' })
    .trim()
    .nonempty({ error: 'La description est requise.' }),
  dueDate: z
    // @link https://zod.dev/api?id=iso-dates#iso-dates
    .iso.date({ error: 'Veuillez saisir une date d\'échéance valide.' }),
  status: z
    .enum(["TODO", "IN_PROGRESS", "DONE"], { error: 'Veuillez sélectionner un statut valide.' }),
  assigneeIds: z
    .array(z.string(), { error: 'Liste des personnes assignées invalide.' }),
});

export const createCommentFormSchema = z.object({
  content: z
    .string({ error: 'Le commentaire est requis.' })
    .trim()
    .nonempty({ error: 'Le commentaire est requis.' }),
  task: z
    .string({ error: 'Tâche invalide.' })
    .nonempty({ error: 'Tâche invalide.' }),
  author: z
    .string({ error: 'Auteur invalide.' })
    .nonempty({ error: 'Auteur invalide.' }),
});
