"use client";

import Image from "next/image";
import Link from "next/link";

import logoImage from "./images/logo.png";
import { getNameInitials } from "@/services/helpers";
import { usePathname } from "next/navigation";

export default function Header({ session }) {

  // pas de header sur les pages user non connecté
  if (session === undefined) {
    return;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();

  return (
    // <header>
    //   <Image src={`/images/logo.png`} width={253} height={33} alt="Logo Abricot" loading="eager" />
    //   <nav>
    //     <Link className="underline mr-4" href="/">Tableau de bord</Link>
    //     <Link className="underline mr-4" href="/projects">Projets</Link>
    //     <Link className="underline mr-4" href="/register">Inscription</Link>
    //     <Link className="underline mr-4" href="/login">Connexion</Link>
    //     <Link className="mr-4" href="/pouet">{session.userName}</Link>
    //     <Link className="underline mr-4" href="/account">Mon compte</Link>
    //     <a className="underline mr-4" href="/logout">Déconnexion</a>
    //   </nav>
    //   <hr />
    // </header>

    <header className="app-header">
      <div className="app-header-inner">
        <Link href="/" className="app-logo">
          <Image src={logoImage} alt="Logo Abricot" width="253" height="33" className="h-6 w-auto" loading="eager" />
        </Link>
        <nav className="app-nav">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM11 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM3 11a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1v-5zM11 9a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1v-6a1 1 0 00-1-1h-4z" />
            </svg>
            Tableau de bord
          </Link>
          <Link href="/projects" className={`nav-link ${pathname.startsWith('/projects') ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            Projets
          </Link>
          {/* <Link className="underline mr-4" href="/register">Inscription</Link>
          <Link className="underline mr-4" href="/login">Connexion</Link> */}
        </nav>
        <Link className="underline mr-4" href="/account">Mon compte</Link>
        <a className="underline mr-4" href="/logout">Déconnexion</a>
        <span className="avatar">{getNameInitials(session.userName)}</span>
      </div>
    </header>

  )
}