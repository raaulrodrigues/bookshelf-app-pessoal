import { Book } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StarRating } from "./StarRating";
import { Eye, FilePenLine } from "lucide-react";
import { DeleteBookDialog } from "./DeleteBookDialog";
import Link from "next/link";

interface BookCardProps {
  book: Book & { genre?: { name: string } | null };
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={book.coverUrl || '/fallback-cover.png'}
            alt={`Capa do livro ${book.title}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        {book.genre?.name && (
          <Badge variant="outline" className="mb-2">
            {book.genre.name}
          </Badge>
        )}
        <CardTitle className="mb-1 text-lg leading-tight line-clamp-2">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {book.author} {book.year && `(${book.year})`}
        </p>
        {book.rating && <StarRating rating={book.rating} className="mt-2" />}
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/library/${book.id}`}>
            <Eye className="mr-2 h-4 w-4" /> Ver
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/library/${book.id}/edit`}>
              <FilePenLine className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteBookDialog bookId={book.id} />
        </div>
      </CardFooter>
    </Card>
  );
}