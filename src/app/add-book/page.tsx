"use client";

import { useState } from "react";
import { BookForm } from "@/components/book/BookForm";
import { BookSearch } from "@/components/book/BookSearch";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BookSearchResult = {
  title: string;
  author: string;
  year?: number;
  pages?: number;
  synopsis?: string;
  publisher?: string;
  coverUrl: string;
  genreName?: string;
};

export default function NewBookPage() {
  const [selectedBook, setSelectedBook] = useState<BookSearchResult | null>(null);

  const handleBookSelect = (book: BookSearchResult) => {
    setSelectedBook(book);
  };

  const handleReset = () => {
    setSelectedBook(null);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/library">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold font-serif">
            {selectedBook ? "Confirme e Adicione o Livro" : "Adicionar Novo Livro via Busca"}
          </h1>
        </div>
        {selectedBook && (
          <Button variant="outline" onClick={handleReset}>
            Buscar Outro Livro
          </Button>
        )}
      </div>

      {selectedBook ? (
        <BookForm book={selectedBook} />
      ) : (
        <BookSearch onBookSelect={handleBookSelect} />
      )}
    </div>
  );
}