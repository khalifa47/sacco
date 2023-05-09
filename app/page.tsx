import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>This is the home page!</h1>
      <Link href="/auth">Go to Login</Link>
    </main>
  );
}
