import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex-1">
      <div className="page-container flex flex-col items-center gap-4 py-16 text-center">
        <p className="font-heading text-5xl font-bold text-ink">404</p>
        <h1 className="font-heading text-2xl font-bold text-ink">Page non trouvée</h1>
        <Link className="btn-dark mt-4" href="/">Retour au tableau de bord</Link>
      </div>
    </main>
  );
}