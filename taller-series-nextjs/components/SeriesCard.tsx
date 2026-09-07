"use client";

import Link from "next/link";
import { useSeries } from "@/context/SeriesContext";
import type { Serie } from "@/types/serie";

interface SeriesCardProps {
  serie: Serie;
}

export default function SeriesCard({ serie }: SeriesCardProps) {
  const { eliminarSerie, cambiarFavorita } = useSeries();

  const confirmarEliminacion = () => {
    const confirmar = window.confirm(`¿Eliminar la serie "${serie.titulo}"?`);
    if (confirmar) eliminarSerie(serie.id);
  };

  return (
    <article className="rounded border border-gray-300 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">{serie.titulo}</h2>
          <p className="text-sm text-gray-600">
            {serie.genero} · {serie.plataforma}
          </p>
        </div>
        <span className="rounded bg-gray-100 px-2 py-1 text-sm">
          {serie.calificacion}/10
        </span>
      </div>

      <p className="mt-3 text-sm">
        {serie.temporadas} {serie.temporadas === 1 ? "temporada" : "temporadas"}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <Link
          href={`/series/${serie.id}`}
          className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        >
          Ver
        </Link>
        <Link
          href={`/series/${serie.id}/editar`}
          className="rounded border border-gray-400 px-3 py-2 hover:bg-gray-100"
        >
          Editar
        </Link>
        <button
          type="button"
          onClick={() => cambiarFavorita(serie.id)}
          className="rounded border border-gray-400 px-3 py-2 hover:bg-gray-100"
        >
          {serie.favorita ? "★ Favorita" : "☆ Favorita"}
        </button>
        <button
          type="button"
          onClick={confirmarEliminacion}
          className="rounded border border-red-500 px-3 py-2 text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
