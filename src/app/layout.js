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
        <Image src={`/images/logo.png`} width={253} height={33} alt="Logo Abricot" />
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
