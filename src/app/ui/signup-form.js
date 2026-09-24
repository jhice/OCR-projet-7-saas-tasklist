'use client'

import { signup } from '@/app/actions/auth'
import Link from 'next/link'
import { useActionState } from 'react'

import logoImage from "../ui/images/logo.png";
import registerImage from "../ui/images/auth-signin.jpg";
import Image from 'next/image';

export default function SignupForm() {

  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <>
      <div className="auth-shell">
        {/* Panneau formulaire */}
        <div className="auth-panel px-8 py-10 sm:px-16 sm:py-12">
          <header>
            <Image src={logoImage} alt="Logo Abricot" width="253" height="33" className="h-9 w-auto mx-auto" />
          </header>

          <main className="flex flex-1 flex-col justify-center py-12">
            <div className="mx-auto w-full max-w-xs">
              <h1 className="font-heading text-4xl font-bold text-brand text-center mb-8">Inscription</h1>

              <form className="space-y-6" action={action}>

                <div>
                  <label htmlFor="name" className="auth-label">Prénom et nom</label>
                  <input id="name" name="name" type="text" autoComplete="name" className="auth-input" placeholder="ex. Lucien Dupont" />
                </div>
                {state?.errors?.name && <p className="text-[#CC3300]">{state.errors.name}</p>}

                <div>
                  <label htmlFor="email" className="auth-label">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" className="auth-input" placeholder="ex. lucien.dupont@example.com" />
                </div>
                {state?.errors?.email && <p className="text-[#CC3300]">{state.errors.email}</p>}

                <div>
                  <label htmlFor="password" className="auth-label">Mot de passe</label>
                  <input id="password" name="password" type="password" autoComplete="new-password" className="auth-input" placeholder="8 caractères min." />
                </div>
                {state?.errors?.password && (
                  <div className="text-[#CC3300]">
                    <p>Password must :</p>
                    <ul>
                      {state.errors.password.map((error) => (
                        <li key={error}>- {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-center pt-2">
                  <button type="submit" className="auth-button">S’inscrire</button>
                </div>
              </form>
            </div>
          </main>

          <footer className="text-center text-sm text-gray-700">
            Déjà inscrit&nbsp;? <a href="/login" className="auth-link">Se connecter</a>
          </footer>
        </div>

        {/* Panneau photo */}
        <div className="auth-photo">
          <Image src={registerImage} alt="" loading='eager' />
        </div>
      </div>
    </>
  )
}