"use client";

import Image from "next/image";
import logoBlack from "../ui/images/logo-black.png";

/**
 * Composant pied de page
 * @returns JSX.Element
 */
export default function Footer({ hasSession }) {

  // pas de header sur les pages user non connecté
  if (!hasSession) {
    return;
  }

  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <Image src={logoBlack} alt="" width="253" height="33" className="h-4 w-auto" />
        <span>Abricot 2026</span>
      </div>
    </footer>
  );
}