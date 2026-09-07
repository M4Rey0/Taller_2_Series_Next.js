import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/series" className="text-xl font-bold text-blue-700">
          Series TV
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="/series" className="hover:text-blue-700">
            Lista
          </Link>
          <Link href="/series/nueva" className="hover:text-blue-700">
            Nueva serie
          </Link>
        </div>
      </nav>
    </header>
  );
}
