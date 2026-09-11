import Link from "next/link";

export const metadata = {
  title: "Nom du projet",
};

export default async function Project({ params }) {
  const { id } = await params
  return (
    <>
      <Link href="/projects">&lt; Retour</Link>
      <h1>Projet {id}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam assumenda iusto eum esse, maiores ea, architecto officia et repudiandae optio repellat placeat, expedita fugit magni tempore illo? Aut, cumque facilis!</p>
    </>
  )
}