"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const cambiarIdioma = (nuevoIdioma: string) => {
    const partes = pathname.split("/");

    // La posición 1 corresponde a "es" o "en"
    partes[1] = nuevoIdioma;

    return partes.join("/");
  };

  return (
    <div className="flex gap-2 text-sm">
      <Link
        href={cambiarIdioma("es")}
        className="hover:text-blue-700"
      >
        ES
      </Link>

      <span>|</span>

      <Link
        href={cambiarIdioma("en")}
        className="hover:text-blue-700"
      >
        EN
      </Link>
    </div>
  );
}