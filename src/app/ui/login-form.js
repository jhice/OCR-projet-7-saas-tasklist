"use client";

import { signin } from "@/app/actions/login";
import Image from "next/image";
import { useActionState, useState } from "react";

import logoImage from "../ui/images/logo.png";
import loginImage from "../ui/images/auth-login.jpg";

export default function LoginForm() {

  const [state, action, pending] = useActionState(signin, null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="auth-shell">
        {/* Panneau formulaire */}
        <div className="auth-panel px-8 py-10 sm:px-16 sm:py-12">
          <header>
            <Image src={logoImage} alt="Logo Abricot" width="253" height="33" className="h-9 w-auto mx-auto" loading="eager" />
          </header>

          <main className="flex flex-1 flex-col justify-center py-12">
            <div className="mx-auto w-full max-w-xs">
              <h1 className="font-heading text-4xl font-bold text-brand text-center mb-8">Connexion</h1>

              <form action={action} className="space-y-6">
                
                <div>
                  <label htmlFor="email" className="auth-label">Email</label>
                  <input id="email" aria-invalid={!!state?.errors?.email} aria-describedby={state?.errors?.email ? "email-error" : undefined} name="email" value={email} onChange={e => setEmail(e.target.value)} type="text" autoComplete="email" className="auth-input"/>
                  {state?.errors?.email && <p id="email-error" className="text-[#CC3300] mt-2 ml-2 text-sm">{state.errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="auth-label">Mot de passe</label>
                  <input id="password" aria-invalid={!!state?.errors?.password} aria-describedby={state?.errors?.password ? "password-error" : undefined} name="password" value={password} onChange={e => setPassword(e.target.value)} type="password" autoComplete="current-password" className="auth-input" />
                  {state?.errors?.password && (
                    <div id="password-error" className="text-[#CC3300] mt-2 ml-2 text-sm">
                      {/* <p>Le mot de passe doit contenir :</p> */}
                      <ul>
                        {state.errors.password.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-4 pt-2">
                  {state?.errors?.login && <p role="alert" className="text-[#CC3300] mt-2 ml-2 text-sm">{state.errors.login}</p>}
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
  );
}