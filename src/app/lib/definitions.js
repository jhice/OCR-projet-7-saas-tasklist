import * as z from 'zod'

// P@ssword123

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
})

export const SigninFormSchema = z.object({
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
})

export const UserUpdateFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
});

export const UserUpdateFormSchemaNoPassword = z.object({
  name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim()
    .trim(),
});

export const createProjectFormSchema = z.object({
  name: z
    .string()
    .nonempty()
    .trim(),
  description: z
    .string()
    .nonempty()
    .trim(),
  contributors: z
    .array(z.string()),
});

export const createTaskFormSchema = z.object({
  title: z
    .string()
    .nonempty()
    .trim(),
  description: z
    .string()
    .nonempty()
    .trim(),
  dueDate: z
    // @link https://zod.dev/api?id=iso-dates#iso-dates
    .iso.date(),
  assigneeIds: z
    .array(z.string()),
});

export const updateTaskFormSchema = z.object({
  title: z
    .string()
    .nonempty()
    .trim(),
  description: z
    .string()
    .nonempty()
    .trim(),
  dueDate: z
    // @link https://zod.dev/api?id=iso-dates#iso-dates
    .iso.date(),
  status: z
    .enum(["TODO", "IN_PROGRESS", "DONE"]),
  assigneeIds: z
    .array(z.string()),
});