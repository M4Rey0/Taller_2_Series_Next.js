import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import { SeriesProvider } from "@/context/SeriesContext";

export const metadata: Metadata = {
  title: "Series TV",
  description: "CRUD de series con Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SeriesProvider>
          <Header />
          <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
            {children}
          </main>
        </SeriesProvider>
      </body>
    </html>
  );
}
