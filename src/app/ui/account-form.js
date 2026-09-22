'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function AccountForm({ session }) {

  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action} autoComplete='off'>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" defaultValue={session.userName} />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" defaultValue={session.userEmail} />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" defaultValue={""} />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type="submit">
        Modifier les informations
      </button>
    </form>
  )
}