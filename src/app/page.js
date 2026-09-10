import Link from "next/link";

export const metadata = {
  title: "Home",
  description: "Welcome to Next.",
};

export default function Home() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <Link href="/about">About us</Link>
    </div>
  )
}