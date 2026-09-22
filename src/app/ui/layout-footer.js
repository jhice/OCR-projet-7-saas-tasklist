"use client";

export default function Footer({ session }) {

  // pas de header sur les pages user non connecté
  if (session === undefined) {
    return;
  }

  return (
    <footer><hr />Made with &hearts; by Abricot &copy; 2026</footer>
  )
}