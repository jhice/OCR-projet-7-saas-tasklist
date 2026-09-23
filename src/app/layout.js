import { Manrope, Inter } from "next/font/google";

const ManropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const InterSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

import "./app.css";
import getSessionCookie from "./lib/get-session-cookie";
import Header from "./ui/layout-header";
import Footer from "./ui/layout-footer";

export default async function Layout({ children }) {

  const session = await getSessionCookie();

  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
      </head>
      <body className="min-h-full flex flex-col app-shell text-ink">
        <Header session={session} />
        {children}
        <Footer session={session} />
      </body>
    </html>
  );
}
