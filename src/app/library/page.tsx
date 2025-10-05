import { getBooks, getGenres } from "@/lib/actions";
import { BookCard } from "@/components/book/BookCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { LibraryControls } from "@/components/book/LibraryControls";
import { Book } from "@prisma/client";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    genre?: string;
  };
}) {
  const query = searchParams?.query;
  const genre = searchParams?.genre;

  const books = await getBooks({ query, genre });
  const genres = await getGenres();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Biblioteca</h1>
        <Button asChild>
          <Link href="/add-book">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Livro
          </Link>
        </Button>
      </div>

      <LibraryControls genres={genres} />

      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book as Book & { genre: { name: string } | null }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">Nenhum livro encontrado</h2>
          <p className="text-muted-foreground mt-2">
            Tente ajustar sua busca ou filtro.
          </p>
        </div>
      )}
    </div>
  );
}