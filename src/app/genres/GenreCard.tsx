import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type GenreWithBooksAndCount = Prisma.GenreGetPayload<{
  include: {
    _count: { select: { books: true } };
    books: { select: { coverUrl: true; id: true } };
  };
}>;

interface GenreCardProps {
  genre: GenreWithBooksAndCount;
}

export function GenreCard({ genre }: GenreCardProps) {
  const bookCount = genre._count.books;

  return (
    <Link href={`/library?genre=${genre.name}`} className="block">
      <Card className="flex flex-col h-full hover:border-primary transition-all">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{genre.name}</span>
            <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
              {bookCount} {bookCount === 1 ? 'livro' : 'livros'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow grid grid-cols-2 gap-2">
          {genre.books.map((book) => (
            <div key={book.id} className="relative aspect-[2/3] w-full rounded-sm overflow-hidden">
                <Image
                    src={book.coverUrl || '/fallback-cover.png'}
                    alt={`Capa de livro do gênero ${genre.name}`}
                    fill
                    className="object-cover"
                />
            </div>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}