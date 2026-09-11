import Link from "next/link";

export const metadata = {
  title: "Mes projets",
};

export default function Projects() {
  return (
    <>
      <h1>Mes projets</h1>
      <p>Gérez vos projets</p>
      <ul>
        <li>Projet 1 &ndash; <Link href="/projects/1">Afficher</Link></li>
        <li>Projet 2 &ndash; <Link href="/projects/2">Afficher</Link></li>
        <li>Projet 3 &ndash; <Link href="/projects/3">Afficher</Link></li>
      </ul>
    </>
  )
}