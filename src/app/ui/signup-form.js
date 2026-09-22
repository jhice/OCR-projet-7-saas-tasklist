'use client'

import { signup } from '@/app/actions/auth'
import Link from 'next/link'
import { useActionState } from 'react'

export default function SignupForm() {

  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <>
      <h1 className='font-heading' style={{fontWeight: "bold", fontSize: "2rem"}}>Inscription</h1>
      <form action={action}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Name" />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="Email" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
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
          Sign Up
        </button>
      </form>
      <hr />
      <p><Link href="/login">Se connecter</Link></p>
    </>
  )
}