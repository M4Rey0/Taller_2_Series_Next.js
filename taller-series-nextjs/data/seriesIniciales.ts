import type { Serie } from "@/types/serie";

export const seriesIniciales: Serie[] = [
  {
    id: "1",
    titulo: "Dark",
    genero: "Ciencia ficción",
    temporadas: 3,
    plataforma: "Netflix",
    calificacion: 8.7,
    descripcion: "Una desaparición conecta a varias familias y distintas épocas.",
    favorita: true,
  },
  {
    id: "2",
    titulo: "Arcane",
    genero: "Animación",
    temporadas: 2,
    plataforma: "Netflix",
    calificacion: 9,
    descripcion: "Dos hermanas quedan en lados opuestos de un conflicto entre ciudades.",
    favorita: false,
  },
  {
    id: "3",
    titulo: "The Bear",
    genero: "Drama",
    temporadas: 4,
    plataforma: "Disney+",
    calificacion: 8.5,
    descripcion: "Un chef regresa a Chicago para encargarse del restaurante familiar.",
    favorita: false,
  }
];
