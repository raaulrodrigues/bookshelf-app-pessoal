import { Book } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { StarRating } from "./StarRating";
import Link from "next/link";

interface BookCardProps {
  book: Book & { genre?: { name: string } | null };
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="bg-transparent border-none shadow-none flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/library/${book.id}`} className="block relative aspect-[2/3] w-full rounded-md overflow-hidden group drop-shadow-lg border border-white/10">
          <Image
            src={book.coverUrl || "/fallback-cover.png"}
            alt={`Capa do livro ${book.title}`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <Link href={`/library/${book.id}`} className="block">
            <h3 className="font-bold text-lg leading-tight line-clamp-1 hover:text-primary transition-colors">
                {book.title}
            </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
        {book.rating && <StarRating rating={book.rating} className="mt-1" />}
      </CardContent>
    </Card>
  );
}