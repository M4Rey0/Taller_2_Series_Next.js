"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useSeries } from "@/context/SeriesContext";
import type {
  DatosSerie,
  ErroresFormulario,
  FormularioSerie,
  Serie,
} from "@/types/serie";

interface SeriesFormProps {
  modo: "crear" | "editar";
  id?: string;
}

interface FormContentProps {
  modo: "crear" | "editar";
  id?: string;
  valoresIniciales: FormularioSerie;
}

const formularioVacio: FormularioSerie = {
  titulo: "",
  genero: "",
  temporadas: "",
  plataforma: "",
  calificacion: "",
  descripcion: "",
};

const convertirSerie = (serie: Serie): FormularioSerie => ({
  titulo: serie.titulo,
  genero: serie.genero,
  temporadas: String(serie.temporadas),
  plataforma: serie.plataforma,
  calificacion: String(serie.calificacion),
  descripcion: serie.descripcion,
});

const validar = (formulario: FormularioSerie): ErroresFormulario => {
  const errores: ErroresFormulario = {};

  if (!formulario.titulo.trim()) errores.titulo = "El título es obligatorio.";
  if (!formulario.genero.trim()) errores.genero = "El género es obligatorio.";
  if (!formulario.plataforma.trim()) {
    errores.plataforma = "La plataforma es obligatoria.";
  }

  const temporadas = Number(formulario.temporadas);
  if (!Number.isInteger(temporadas) || temporadas < 1) {
    errores.temporadas = "Escribe un número entero mayor que 0.";
  }

  const calificacion = Number(formulario.calificacion);
  if (!Number.isFinite(calificacion) || calificacion < 1 || calificacion > 10) {
    errores.calificacion = "La calificación debe estar entre 1 y 10.";
  }

  if (!formulario.descripcion.trim()) {
    errores.descripcion = "La descripción es obligatoria.";
  }

  return errores;
};

function FormContent({ modo, id, valoresIniciales }: FormContentProps) {
  const router = useRouter();
  const { agregarSerie, editarSerie } = useSeries();
  const [formulario, setFormulario] =
    useState<FormularioSerie>(valoresIniciales);
  const [errores, setErrores] = useState<ErroresFormulario>({});

  const manejarCambio = (
    evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const nombre = evento.target.name as keyof FormularioSerie;
    const nuevoFormulario: FormularioSerie = {
      ...formulario,
      [nombre]: evento.target.value,
    };
    const errorDelCampo = validar(nuevoFormulario)[nombre];

    setFormulario(nuevoFormulario);
    setErrores((anteriores) => {
      const actualizados = { ...anteriores };

      if (errorDelCampo) {
        actualizados[nombre] = errorDelCampo;
      } else {
        delete actualizados[nombre];
      }

      return actualizados;
    });
  };

  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const nuevosErrores = validar(formulario);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    const datos: DatosSerie = {
      titulo: formulario.titulo.trim(),
      genero: formulario.genero.trim(),
      temporadas: Number(formulario.temporadas),
      plataforma: formulario.plataforma.trim(),
      calificacion: Number(formulario.calificacion),
      descripcion: formulario.descripcion.trim(),
    };

    if (modo === "crear") {
      const nuevoId = agregarSerie(datos);
      setFormulario(formularioVacio);
      setErrores({});
      router.push(`/series/${nuevoId}`);
      return;
    }

    if (id) {
      editarSerie(id, datos);
      setErrores({});
      router.push(`/series/${id}`);
    }
  };

  const claseInput = "w-full rounded border border-gray-300 px-3 py-2";

  return (
    <form
      onSubmit={manejarEnvio}
      noValidate
      className="mx-auto max-w-2xl space-y-4 rounded border bg-white p-5"
    >
      <div>
        <label htmlFor="titulo" className="mb-1 block font-medium">
          Título
        </label>
        <input
          id="titulo"
          name="titulo"
          value={formulario.titulo}
          onChange={manejarCambio}
          className={claseInput}
        />
        {errores.titulo && <p className="mt-1 text-sm text-red-600">{errores.titulo}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="genero" className="mb-1 block font-medium">
            Género
          </label>
          <input
            id="genero"
            name="genero"
            value={formulario.genero}
            onChange={manejarCambio}
            className={claseInput}
          />
          {errores.genero && <p className="mt-1 text-sm text-red-600">{errores.genero}</p>}
        </div>

        <div>
          <label htmlFor="plataforma" className="mb-1 block font-medium">
            Plataforma
          </label>
          <input
            id="plataforma"
            name="plataforma"
            value={formulario.plataforma}
            onChange={manejarCambio}
            className={claseInput}
          />
          {errores.plataforma && <p className="mt-1 text-sm text-red-600">{errores.plataforma}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="temporadas" className="mb-1 block font-medium">
            Temporadas
          </label>
          <input
            id="temporadas"
            name="temporadas"
            type="number"
            min="1"
            value={formulario.temporadas}
            onChange={manejarCambio}
            className={claseInput}
          />
          {errores.temporadas && <p className="mt-1 text-sm text-red-600">{errores.temporadas}</p>}
        </div>

        <div>
          <label htmlFor="calificacion" className="mb-1 block font-medium">
            Calificación (1 a 10)
          </label>
          <input
            id="calificacion"
            name="calificacion"
            type="number"
            min="1"
            max="10"
            step="0.1"
            value={formulario.calificacion}
            onChange={manejarCambio}
            className={claseInput}
          />
          {errores.calificacion && <p className="mt-1 text-sm text-red-600">{errores.calificacion}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="descripcion" className="mb-1 block font-medium">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={4}
          value={formulario.descripcion}
          onChange={manejarCambio}
          className={claseInput}
        />
        {errores.descripcion && <p className="mt-1 text-sm text-red-600">{errores.descripcion}</p>}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {modo === "crear" ? "Guardar serie" : "Guardar cambios"}
        </button>
        <Link
          href="/series"
          className="rounded border border-gray-400 px-4 py-2 hover:bg-gray-100"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

export default function SeriesForm({ modo, id }: SeriesFormProps) {
  const { series, cargando } = useSeries();

  if (cargando) {
    return <p className="py-10 text-center text-gray-600">Cargando...</p>;
  }

  if (modo === "editar") {
    const serie = series.find((elemento) => elemento.id === id);

    if (!serie) {
      return <p className="rounded border p-5">La serie no existe.</p>;
    }

    return (
      <FormContent
        key={serie.id}
        modo="editar"
        id={serie.id}
        valoresIniciales={convertirSerie(serie)}
      />
    );
  }

  return <FormContent modo="crear" valoresIniciales={formularioVacio} />;
}
