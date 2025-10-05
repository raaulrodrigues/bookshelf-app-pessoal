export type ReadingStatus =
  | "QUERO_LER"
  | "LENDO"
  | "LIDO"
  | "PAUSADO"
  | "ABANDONADO";

export const genres = [
  "Literatura Brasileira", "Ficção Científica", "Realismo Mágico", "Ficção", "Fantasia", "Romance", "Biografia", "História", "Autoajuda", "Tecnologia", "Programação", "Negócios", "Psicologia", "Filosofia", "Poesia",
] as const;

export type Genre = typeof genres[number];

export interface Book {
  id: string;
  title: string;
  author: string;
  year?: number;
  genre?: Genre;
  pages?: number;
  rating?: number;
  synopsis?: string;
  coverUrl: string;
  status: ReadingStatus;
  currentPage?: number;
  notes?: string;
}