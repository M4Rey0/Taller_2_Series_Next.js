"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { seriesIniciales } from "@/data/seriesIniciales";
import type { DatosSerie, Serie } from "@/types/serie";

const CLAVE_STORAGE = "series-tv";

interface SeriesContexto {
  series: Serie[];
  cargando: boolean;
  agregarSerie: (datos: DatosSerie) => string;
  editarSerie: (id: string, datos: DatosSerie) => void;
  eliminarSerie: (id: string) => void;
  cambiarFavorita: (id: string) => void;
}

const SeriesContext = createContext<SeriesContexto | null>(null);

export function SeriesProvider({ children }: { children: ReactNode }) {
  const [series, setSeries] = useState<Serie[]>(seriesIniciales);
  const [cargando, setCargando] = useState(true);

  // localStorage solo existe en el navegador, por eso se carga al montar.
  useEffect(() => {
    const temporizador = window.setTimeout(() => {
      try {
        const guardadas = window.localStorage.getItem(CLAVE_STORAGE);

        if (guardadas) {
          const datos: unknown = JSON.parse(guardadas);
          if (Array.isArray(datos)) {
            setSeries(datos as Serie[]);
          }
        }
      } catch (error) {
        console.error("No se pudieron cargar las series:", error);
      } finally {
        setCargando(false);
      }
    }, 0);

    return () => window.clearTimeout(temporizador);
  }, []);

  // Cada cambio del estado se guarda en el navegador.
  useEffect(() => {
    if (cargando) return;

    try {
      window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(series));
    } catch (error) {
      console.error("No se pudieron guardar las series:", error);
    }
  }, [series, cargando]);

  const agregarSerie = (datos: DatosSerie): string => {
    const id = Date.now().toString();
    const nuevaSerie: Serie = { id, ...datos, favorita: false };
    setSeries((anteriores) => [...anteriores, nuevaSerie]);
    return id;
  };

  const editarSerie = (id: string, datos: DatosSerie) => {
    setSeries((anteriores) =>
      anteriores.map((serie) =>
        serie.id === id ? { ...serie, ...datos } : serie,
      ),
    );
  };

  const eliminarSerie = (id: string) => {
    setSeries((anteriores) => anteriores.filter((serie) => serie.id !== id));
  };

  const cambiarFavorita = (id: string) => {
    setSeries((anteriores) =>
      anteriores.map((serie) =>
        serie.id === id ? { ...serie, favorita: !serie.favorita } : serie,
      ),
    );
  };

  return (
    <SeriesContext.Provider
      value={{
        series,
        cargando,
        agregarSerie,
        editarSerie,
        eliminarSerie,
        cambiarFavorita,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
}

export function useSeries() {
  const contexto = useContext(SeriesContext);

  if (!contexto) {
    throw new Error("useSeries debe usarse dentro de SeriesProvider");
  }

  return contexto;
}
