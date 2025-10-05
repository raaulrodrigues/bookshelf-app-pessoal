import { getBook } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarRating } from "@/components/book/StarRating";
import { ArrowLeft, FilePenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DeleteBookDialog } from "@/components/book/DeleteBookDialog";

export default async function BookDetailsPage({
  params,
}: {
  params: { bookId: string };
}) {
  const book = await getBook(params.bookId);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <Button variant="outline" size="icon" asChild>
          <Link href="/library">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/library/${book.id}/edit`}>
              <FilePenLine className="mr-2 h-4 w-4" /> Editar
            </Link>
          </Button>
          <DeleteBookDialog bookId={book.id} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col items-center gap-6">
          <Card className="overflow-hidden w-full max-w-[300px]">
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={book.coverUrl || "/fallback-cover.png"}
                alt={`Capa de ${book.title}`}
                fill
                className="object-cover"
              />
            </div>
          </Card>
          {book.rating && <StarRating rating={book.rating} />}
          <Badge>{book.status.replace(/_/g, " ")}</Badge>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{book.title}</h1>
            <p className="text-xl text-muted-foreground mt-1">
              {book.author}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {book.genre?.name && (
              <div className="flex flex-col">
                <span className="text-muted-foreground">Gênero</span>
                <span className="font-semibold">{book.genre.name}</span>
              </div>
            )}
            {book.year && (
              <div className="flex flex-col">
                <span className="text-muted-foreground">Ano</span>
                <span className="font-semibold">{book.year}</span>
              </div>
            )}
            {book.pages && (
              <div className="flex flex-col">
                <span className="text-muted-foreground">Páginas</span>
                <span className="font-semibold">{book.pages}</span>
              </div>
            )}
          </div>

          {book.synopsis && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Sinopse</h2>
              <p className="text-muted-foreground">{book.synopsis}</p>
            </div>
          )}

          {book.notes && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Minhas Anotações</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {book.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}