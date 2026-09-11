import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { SeriesProvider } from "@/context/SeriesContext";
import {
  getDictionary,
  hasLocale,
} from "./dictionaries";

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <SeriesProvider>
      <Header
        lang={lang}
        texts={dictionary.header}
      />

      <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
        {children}
      </main>
    </SeriesProvider>
  );
}