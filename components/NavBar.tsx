import Link from "next/link";

export default function NavBar() {
  return (
    <header className="border-b border-gray-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-ink">
          Trade<span className="text-brand-600">Match</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-steel">
          <Link href="/quiz" className="hover:text-brand-600">
            Career Quiz
          </Link>
          <Link
            href="/apply"
            className="rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
          >
            Apply Free
          </Link>
        </nav>
      </div>
    </header>
  );
}
