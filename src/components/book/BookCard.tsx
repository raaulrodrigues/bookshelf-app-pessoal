import { Book } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="bg-transparent border-none shadow-none rounded-md overflow-hidden group">
      <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden">
        <Image
          src={book.coverUrl || "/fallback-cover.png"}
          alt={`Capa do livro ${book.title}`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Button variant="secondary" size="icon" className="h-8 w-8" asChild>
                    <Link href={`/library/${book.id}/edit`}>
                        <FilePenLine className="h-4 w-4" />
                    </Link>
                </Button>
                 <DeleteBookDialog bookId={book.id} />
            </div>
             <Button variant="secondary" size="sm" asChild>
                <Link href={`/library/${book.id}`}>
                    <Eye className="mr-2 h-4 w-4" /> Ver
                </Link>
            </Button>
        </div>
      </div>
      <CardContent className="p-0 pt-3">
        <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {book.title}
        </h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        {book.rating && <StarRating rating={book.rating} className="mt-1" />}
      </CardContent>
    </Card>
  );
}