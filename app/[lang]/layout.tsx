import type { ReactNode } from "react";
import Header from "@/components/Header";
import { SeriesProvider } from "@/context/SeriesContext";

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <SeriesProvider>
      <Header lang={lang} />

      <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
        {children}
      </main>
    </SeriesProvider>
  );
}