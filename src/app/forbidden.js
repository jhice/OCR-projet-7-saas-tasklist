import Link from "next/link";

export const metadata = {
  title: "Accès refusé",
};

// Page 403 : rendue par forbidden() (ex. projet dont on n'est ni admin ni contributeur)
export default function Forbidden() {
  return (
    <main className="flex-1">
      <div className="page-container flex flex-col items-center gap-4 py-16 text-center">
        <p className="font-heading text-5xl font-bold text-ink">403</p>
        <h1 className="font-heading text-2xl font-bold text-ink">Accès refusé</h1>
        <p className="text-gray-500">Vous n&apos;êtes ni administrateur ni contributeur de ce projet.</p>
        <Link href="/projects" className="btn-dark mt-4">Retour aux projets</Link>
      </div>
    </main>
  );
}
