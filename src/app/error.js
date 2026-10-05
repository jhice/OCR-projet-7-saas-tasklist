"use client"; // les error boundaries doivent être des composants client

import Link from "next/link";

// Page d'erreur générique : API injoignable, erreur 500...
// (en cas de manque de try/catch)
export default function Error({ retry }) {
  return (
    <main className="flex-1">
      <div className="page-container flex flex-col items-center gap-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-ink">Une erreur est survenue</h1>
        <p className="text-gray-500">Le serveur est peut-être momentanément indisponible.</p>
        <div className="mt-4 flex gap-4">
          <button type="button" className="btn-dark" onClick={() => retry()}>Réessayer</button>
          <Link className="btn-dark" href="/">Retour au tableau de bord</Link>
        </div>
      </div>
    </main>
  );
}
