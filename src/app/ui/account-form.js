'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function AccountForm({ session }) {

  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <>
      <section className="panel p-6 sm:p-10">
        <h1 className="font-heading text-2xl font-bold text-ink">Mon compte</h1>
        <p className="mt-1 text-gray-500">Amélie Dupont</p>

        <form action={action} className="mt-8 flex max-w-2xl flex-col gap-6">
          <div>
            <label htmlFor="lastname" className="auth-label">Prénom et nom</label>
            <input id="lastname" name="lastname" type="text" placeholder="Amélie" className="auth-input" defaultValue={session.userName} />
          </div>
          {state?.errors?.name && <p className="text-[#CC3300]">{state.errors.name}</p>}

          {/* <div>
            <label htmlFor="firstname" className="auth-label">Prénom</label>
            <input id="firstname" name="firstname" type="text" placeholder="Amélie" className="auth-input" defaultValue={session.userEmail} />
          </div> */}

          <div>
            <label htmlFor="email" className="auth-label">Email</label>
            <input id="email" name="email" type="email" placeholder="a.dupont@mail.com" className="auth-input" defaultValue={session.userEmail} />
          </div>
          {state?.errors?.email && <p className="text-[#CC3300]">{state.errors.email}</p>}

          <div>
            <label htmlFor="password" className="auth-label">Mot de passe</label>
            <input id="password" name="password" type="password" placeholder="Laissez vide si inchangé..." className="auth-input" />
          </div>
          {state?.errors?.password && (
            <div className="text-[#CC3300]">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <button type="submit" className="btn-dark">Modifier les informations</button>
          </div>
        </form>
      </section>
    </>
  )
}