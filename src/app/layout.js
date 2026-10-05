import { Manrope, Inter } from "next/font/google";

const ManropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const InterSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

// CSS globale
import "./app.css";
// CSS de test pour les contrates accessibilité
import "./app-a11y.css";
import getSessionCookie from "./lib/get-session-cookie";
import LayoutUi from "./ui/layout";

export default async function Layout({ children }) {

  const session = await getSessionCookie();

  return <LayoutUi session={session}>{children}</LayoutUi>;
}
