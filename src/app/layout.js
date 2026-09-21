import { Geist } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import "./app.css";

import { LoginProvider } from "@/services/context";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Layout({ children }) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <Script src="https://cdn.tailwindcss.com" defer></Script>
        <Script src="/assets/tailwind.js" defer></Script>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"></link>
      </head>
      <body className="min-h-full flex flex-col">
        <header>
          <Image src={`/images/logo.png`} width={253} height={33} alt="Logo Abricot" loading="eager" />
          <nav>
            <Link className="underline mr-4" href="/">Tableau de bord</Link>
            <Link className="underline mr-4" href="/projects">Projets</Link>
            <Link className="underline mr-4" href="/account">Mon compte</Link>
            <Link className="underline mr-4" href="/login">Connexion</Link>
            <Link className="underline mr-4" href="/register">Inscription</Link>
          </nav>
          <hr />
        </header>
        <LoginProvider>
          {children}
        </LoginProvider>
        <footer><hr />Made with &hearts; by Abricot &copy; 2026</footer>
      </body>
    </html>
  );
}
