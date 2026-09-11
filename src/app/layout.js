import { Geist } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Layout({ children }) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"></link>
      </head>
      <body className="min-h-full flex flex-col">
        <header>
          <Image src={`/images/logo.png`} width={253} height={33} alt="Logo Abricot" loading="eager" />
          <nav>
            <Link className="underline mr-4" href="/">Tableau de bord</Link>
            <Link className="underline mr-4" href="/projects">Projets</Link>
            <Link className="underline mr-4" href="/account">Mon compte</Link>
          </nav>
          <hr />
        </header>
        {children}
        <footer><hr />Made with &hearts; by Abricot &copy; 2026</footer>
      </body>
    </html>
  );
}
