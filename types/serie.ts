export interface Serie {
  id: string;
  titulo: string;
  genero: string;
  temporadas: number;
  plataforma: string;
  calificacion: number;
  descripcion: string;
  favorita: boolean;
}

export type DatosSerie = Omit<Serie, "id" | "favorita">;

export interface FormularioSerie {
  titulo: string;
  genero: string;
  temporadas: string;
  plataforma: string;
  calificacion: string;
  descripcion: string;
}

export type ErroresFormulario = Partial<
  Record<keyof FormularioSerie, string>
>;
