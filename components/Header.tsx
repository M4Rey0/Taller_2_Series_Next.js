import Link from "next/link";

type HeaderProps = {
  lang: string;
};

export default function Header({ lang }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link
          href={`/${lang}/series`}
          className="text-xl font-bold text-blue-700"
        >
          Series TV
        </Link>

        <div className="flex gap-4 text-sm">
          <Link
            href={`/${lang}/series`}
            className="hover:text-blue-700"
          >
            Lista
          </Link>

          <Link
            href={`/${lang}/series/nueva`}
            className="hover:text-blue-700"
          >
            Nueva serie
          </Link>
        </div>
      </nav>
    </header>
  );
}
