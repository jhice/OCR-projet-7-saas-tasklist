import { Manrope, Inter } from "next/font/google";

// eslint-disable-next-line no-unused-vars
const ManropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

// eslint-disable-next-line no-unused-vars
const InterSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

// CSS globale
import "./app.css";
// CSS proposée pour les contrastes d'accessibilité
import "./app-a11y.css";
import getSessionCookie from "./lib/get-session-cookie";
import LayoutUi from "./ui/layout";

/**
 * Composant d'entrée du prjet Next.js
 */
export default async function Layout({ children }) {
  // on transmet la session au composant client
  const session = await getSessionCookie();
  return <LayoutUi hasSession={session ? true : false} userName={session ? session.userName : null}>{children}</LayoutUi>;
}