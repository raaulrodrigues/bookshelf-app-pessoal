export type ReadingStatus =
  | "QUERO_LER"
  | "LENDO"
  | "LIDO"
  | "PAUSADO"
  | "ABANDONADO";

export interface Book {
  id: string;
  title: string;
  author: string;
  pages?: number;
  currentPage?: number;
  status: ReadingStatus;
  isbn?: string;
  coverUrl?: string;
  genre?: string;
  rating?: number;
  personalNotes?: string;
  synopsis?: string;
  publicationYear?: number;
}