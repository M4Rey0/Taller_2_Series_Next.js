import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import SeriesList from "@/components/SeriesList";

export default function SeriesPage() {
  return (
    <>
      <PageTitle
        titulo="Mis series"
        texto="Busca, crea, edita y elimina series."
        accion={
          <Link
            href="/series/nueva"
            className="w-fit rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Nueva serie
          </Link>
        }
      />
      <SeriesList />
    </>
  );
}
