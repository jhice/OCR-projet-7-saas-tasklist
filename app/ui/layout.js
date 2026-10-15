"use client";

import { closeOptionsMenu } from "../lib/helpers";
import Header from "./layout-header";
import Footer from "./layout-footer";

/**
 * Composant disposition globale de la page
 * @returns JSX.Element
 */
export default function LayoutUi({ children, hasSession, userName }) {

  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
      </head>
      <body className="min-h-full flex flex-col app-shell text-ink" onClick={(e) => closeOptionsMenu(e)}>
        <Header hasSession={hasSession} userName={userName} />
        {children}
        <Footer hasSession={hasSession} />
      </body>
    </html>
  );
}
