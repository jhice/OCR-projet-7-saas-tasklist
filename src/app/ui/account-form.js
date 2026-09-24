'use client'

import { useActionState } from 'react'
import { userUpdate } from '../actions/user-update'

export default function AccountForm({ userData }) {

  const [state, action, pending] = useActionState(userUpdate, undefined)

  return (
    <>
      <section className="panel p-6 sm:p-10">
        <h1 className="font-heading text-2xl font-bold text-ink">Mon compte</h1>
        <p className="mt-1 text-gray-500">{userData.name}</p>

        <form action={action} className="mt-8 flex max-w-2xl flex-col gap-6">
          <div>
            <label htmlFor="name" className="auth-label">Prénom et nom</label>
            <input id="name" name="name" type="text" placeholder="ex. Amélie" className="auth-input" defaultValue={userData.name} />
          </div>
          {state?.errors?.name && <p className="text-[#CC3300]">{state.errors.name}</p>}

          {/* <div>
            <label htmlFor="firstname" className="auth-label">Prénom</label>
            <input id="firstname" name="firstname" type="text" placeholder="Amélie" className="auth-input" defaultValue={userData.email} />
          </div> */}

          <div>
            <label htmlFor="email" className="auth-label">Email</label>
            <input id="email" name="email" type="text" placeholder="ex. a.dupont@mail.com" className="auth-input" defaultValue={userData.email} />
          </div>
          {state?.errors?.email && <p className="text-[#CC3300]">{state.errors.email}</p>}

          <div>
            <label htmlFor="password" className="auth-label">Mot de passe actuel</label>
            <input id="password" name="password" type="password" placeholder="" className="auth-input" />
          </div>

          <div>
            <label htmlFor="newPassword" className="auth-label">Nouveau mot de passe</label>
            <input id="newPassword" name="newPassword" type="password" placeholder="8 caractères min." className="auth-input" />
          </div>
          {state?.errors?.newPassword && (
            <div className="text-[#CC3300]">
              <p>Password must:</p>
              <ul>
                {state.errors.newPassword.map((error) => (
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