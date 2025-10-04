"use client";

import { useState } from "react";
import { BookCard } from "@/components/book/BookCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initialBooks } from "@/data/books";
import { Book } from "@/types";

const genres = [
  "Todos",
  "Literatura Brasileira",
  "Ficção Científica",
  "Realismo Mágico",
  "Fantasia",
  "Programação",
];

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");

  const filteredBooks = initialBooks.filter((book: Book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre =
      selectedGenre === "Todos" || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Minha Biblioteca</h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:w-auto w-full">
          <Input
            placeholder="Buscar por título ou autor..."
            className="sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select onValueChange={setSelectedGenre} defaultValue="Todos">
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="Filtrar por gênero" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">Nenhum livro encontrado.</p>
        </div>
      )}
    </div>
  );
}