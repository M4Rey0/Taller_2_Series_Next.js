"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import SeriesCard from "@/components/SeriesCard";
import { useSeries } from "@/context/SeriesContext";

export default function SeriesList() {
  const [busqueda, setBusqueda] = useState("");
  const { series, cargando } = useSeries();

  if (cargando) {
    return <p className="py-10 text-center text-gray-600">Cargando series...</p>;
  }

  const seriesFiltradas = series.filter((serie) =>
    serie.titulo.toLowerCase().includes(busqueda.trim().toLowerCase()),
  );

  return (
    <section>
      <SearchBar valor={busqueda} alCambiar={setBusqueda} />

      {seriesFiltradas.length === 0 ? (
        <p className="rounded border border-dashed p-6 text-center text-gray-600">
          No se encontraron series.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {seriesFiltradas.map((serie) => (
            <SeriesCard key={serie.id} serie={serie} />
          ))}
        </div>
      )}
    </section>
  );
}
