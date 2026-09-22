'use client'

import { signin } from '@/app/actions/login'
import Link from 'next/link'
import { useActionState } from 'react'

export default function LoginForm() {

  const [state, action, pending] = useActionState(signin, undefined)

  return (
    <>
      <h1 className='font-heading' style={{fontWeight: "bold", fontSize: "2rem"}}>Connexion</h1>
      <form action={action}>

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
          Sign In
        </button>
      </form>
      <hr />
      <p><Link href="/register">Créer un compte</Link></p>
    </>
  )
}