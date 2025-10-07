"use client";

import { useState } from "react";
import { searchGoogleBooks } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Loader2, Search } from "lucide-react";

type BookSearchResult = Awaited<ReturnType<typeof searchGoogleBooks>>[0];

interface BookSearchProps {
  onBookSelect: (book: BookSearchResult) => void;
}

export function BookSearch({ onBookSelect }: BookSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    try {
      const books = await searchGoogleBooks(query);
      setResults(books);
      if (books.length === 0) {
        setError("Nenhum livro encontrado para esta busca.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao buscar os livros.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o título ou autor do livro..."
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {error && <p className="text-center text-muted-foreground">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((book, index) => (
          <button
            key={index}
            onClick={() => onBookSelect(book)}
            className="text-left"
          >
            <Card className="overflow-hidden hover:border-primary transition-all">
              <div className="relative aspect-[2/3] w-full bg-muted">
                {book.coverUrl && (
                  <Image
                    src={book.coverUrl}
                    alt={`Capa de ${book.title}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <CardContent className="p-2">
                <h3 className="font-semibold text-sm truncate">{book.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{book.author}</p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}