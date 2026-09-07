"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSeries } from "@/context/SeriesContext";

interface SeriesDetailProps {
  id: string;
}

export default function SeriesDetail({ id }: SeriesDetailProps) {
  const router = useRouter();
  const { series, cargando, eliminarSerie, cambiarFavorita } = useSeries();

  if (cargando) {
    return <p className="py-10 text-center text-gray-600">Cargando serie...</p>;
  }

  const serie = series.find((elemento) => elemento.id === id);

  if (!serie) {
    return (
      <div className="rounded border bg-white p-6">
        <h1 className="text-2xl font-bold">Serie no encontrada</h1>
        <Link href="/series" className="mt-4 inline-block text-blue-700 underline">
          Volver a la lista
        </Link>
      </div>
    );
  }

  const confirmarEliminacion = () => {
    if (window.confirm(`¿Eliminar la serie "${serie.titulo}"?`)) {
      eliminarSerie(serie.id);
      router.push("/series");
    }
  };

  return (
    <article className="mx-auto max-w-2xl rounded border bg-white p-6">
      <p className="text-sm text-gray-600">{serie.genero}</p>
      <h1 className="mt-1 text-3xl font-bold">{serie.titulo}</h1>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded bg-gray-100 p-3">
          <p className="text-sm text-gray-600">Plataforma</p>
          <p className="font-medium">{serie.plataforma}</p>
        </div>
        <div className="rounded bg-gray-100 p-3">
          <p className="text-sm text-gray-600">Temporadas</p>
          <p className="font-medium">{serie.temporadas}</p>
        </div>
        <div className="rounded bg-gray-100 p-3">
          <p className="text-sm text-gray-600">Calificación</p>
          <p className="font-medium">{serie.calificacion}/10</p>
        </div>
      </div>

      <h2 className="mt-6 text-lg font-semibold">Descripción</h2>
      <p className="mt-2 text-gray-700">{serie.descripcion}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => cambiarFavorita(serie.id)}
          className="rounded border border-gray-400 px-3 py-2 hover:bg-gray-100"
        >
          {serie.favorita ? "★ Quitar favorita" : "☆ Marcar favorita"}
        </button>
        <Link
          href={`/series/${serie.id}/editar`}
          className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        >
          Editar
        </Link>
        <button
          type="button"
          onClick={confirmarEliminacion}
          className="rounded border border-red-500 px-3 py-2 text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>

      <Link href="/series" className="mt-6 inline-block text-blue-700 underline">
        ← Volver a la lista
      </Link>
    </article>
  );
}
