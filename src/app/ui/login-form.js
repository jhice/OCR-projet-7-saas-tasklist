'use client'

import { signin } from '@/app/actions/login'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'

import logoImage from "../ui/images/logo.png";
import loginImage from "../ui/images/auth-login.jpg";

export default function LoginForm() {

  const [state, action, pending] = useActionState(signin, undefined)

  return (
    <>
      <div className="auth-shell">
        {/* Panneau formulaire */}
        <div className="auth-panel px-8 py-10 sm:px-16 sm:py-12">
          <header>
            <Image src={logoImage} alt="Logo Abricot" width="253" height="33" className="h-9 w-auto" />
          </header>

          <main className="flex flex-1 flex-col justify-center py-12">
            <div className="mx-auto w-full max-w-xs">
              <h1 className="font-heading text-4xl font-bold text-brand text-center mb-8">Connexion</h1>

              <form action={action} className="space-y-6">
                <div>
                  <label htmlFor="email" className="auth-label">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" required className="auth-input" />
                </div>
                {state?.errors?.email && <p className="text-[#CC3300]">{state.errors.email}</p>}

                <div>
                  <label htmlFor="password" className="auth-label">Mot de passe</label>
                  <input id="password" name="password" type="password" autoComplete="current-password" required className="auth-input" />
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

                <div className="flex flex-col items-center gap-4 pt-2">
                  <button disabled={pending} type="submit" className="auth-button">Se connecter</button>
                  {/* <a href="#" className="auth-link text-sm">Mot de passe oublié?</a> */}
                </div>
              </form>
            </div>
          </main>

          <footer className="text-center text-sm text-gray-700">
            Pas encore de compte&nbsp;? <a href="/register" className="auth-link">Créer un compte</a>
          </footer>
        </div>

        {/* Panneau photo */}
        <div className="auth-photo">
          <Image src={loginImage} alt="" loading='eager' />
        </div>
      </div>
    </>
  )
}