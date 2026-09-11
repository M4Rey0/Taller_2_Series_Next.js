import { notFound } from "next/navigation";
import SeriesList from "@/components/SeriesList";
import {
  getDictionary,
  hasLocale,
} from "../dictionaries";

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">
        {dictionary.seriesPage.title}
      </h1>

      <SeriesList
        lang={lang}
        texts={dictionary.seriesPage}
      />
    </section>
  );
}