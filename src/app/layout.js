import { Manrope, Inter } from "next/font/google";

import "./app.css";

import Script from "next/script";
import Header from "./ui/layout-header";

const ManropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const InterSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

import getSessionCookie from "./lib/get-session-cookie";
import Footer from "./ui/layout-footer";

export default async function Layout({ children }) {

  const session = await getSessionCookie();

  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <Script src="https://cdn.tailwindcss.com" defer></Script>
        <Script src="/assets/tailwind.js" defer></Script>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"></link>
      </head>
      <body className="min-h-full flex flex-col">
        <Header session={session} />
        {children}
        <Footer session={session} />
      </body>
    </html>
  );
}
