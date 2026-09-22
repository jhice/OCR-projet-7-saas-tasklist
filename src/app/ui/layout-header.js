"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header({ session }) {

  // pas de header sur les pages user non connecté
  if (session === undefined) {
    return;
  }

  return (
    <header>
      <Image src={`/images/logo.png`} width={253} height={33} alt="Logo Abricot" loading="eager" />
      <nav>
        <Link className="underline mr-4" href="/">Tableau de bord</Link>
        <Link className="underline mr-4" href="/projects">Projets</Link>
        <Link className="underline mr-4" href="/register">Inscription</Link>
        <Link className="underline mr-4" href="/login">Connexion</Link>
        <Link className="mr-4" href="/pouet">{session.userName}</Link>
        <Link className="underline mr-4" href="/account">Mon compte</Link>
        <a className="underline mr-4" href="/logout">Déconnexion</a>
      </nav>
      <hr />
    </header>
  )
}