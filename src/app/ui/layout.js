"use client";

import { closeOptionsMenu } from "@/services/helpers";
import Header from "./layout-header";
import Footer from "./layout-footer";

export default function LayoutUi({ children, session }) {

  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
      </head>
      <body className="min-h-full flex flex-col app-shell text-ink" onClick={(e) => closeOptionsMenu(e)}>
        <Header session={session} />
        {children}
        <Footer session={session} />
      </body>
    </html>
  );
}
