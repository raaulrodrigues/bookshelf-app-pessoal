import { getBook } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarRating } from "@/components/book/StarRating";
import { ArrowLeft, FilePenLine, Globe, Building, BookOpen, Tag } from "lucide-react";
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
    <div>
      <div className="relative h-64 w-full">
        <Image
          src={book.coverUrl || "/fallback-cover.png"}
          alt={`Plano de fundo para ${book.title}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      </div>

      <div className="container -mt-32 relative pb-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 flex flex-col items-center md:items-start gap-4">
            <Card className="overflow-hidden w-[250px] aspect-[2/3] border-4 border-card shadow-lg">
              <div className="relative w-full h-full">
                <Image
                  src={book.coverUrl || "/fallback-cover.png"}
                  alt={`Capa de ${book.title}`}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
            {book.rating && <StarRating rating={book.rating} />}
          </div>

          <div className="md:col-span-2 space-y-8 pt-4 text-white">
            <div>
              {book.series && <p className="text-primary font-semibold">{book.series}</p>}
              <div className="flex items-baseline gap-4">
                <h1 className="text-4xl font-serif font-bold">{book.title}</h1>
                {book.year && (
                  <Link href={`/library?year=${book.year}`} className="text-xl text-muted-foreground hover:text-foreground transition-colors">{book.year}</Link>
                )}
              </div>
              <p className="text-lg text-muted-foreground mt-1">
                Por {book.author}
              </p>
            </div>
            
            {book.synopsis && (
              <div className="border-t border-border/50 pt-6">
                <h2 className="font-serif text-xl font-semibold mb-2">Sinopse</h2>
                <p className="text-foreground/80 whitespace-pre-wrap">{book.synopsis}</p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm border-t border-border/50 pt-6">
              {book.genre?.name && (
                <div className="flex items-start gap-2">
                  <Tag className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                  <div>
                    <span className="text-muted-foreground">Gênero</span>
                    <p className="font-semibold">{book.genre.name}</p>
                  </div>
                </div>
              )}
              {book.pages && (
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                  <div>
                    <span className="text-muted-foreground">Páginas</span>
                    <p className="font-semibold">{book.pages}</p>
                  </div>
                </div>
              )}
              {book.publisher && (
                 <div className="flex items-start gap-2">
                  <Building className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                  <div>
                    <span className="text-muted-foreground">Editora</span>
                    <p className="font-semibold">{book.publisher}</p>
                  </div>
                </div>
              )}
              {book.language && (
                 <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                  <div>
                    <span className="text-muted-foreground">Idioma</span>
                    <p className="font-semibold">{book.language}</p>
                  </div>
                </div>
              )}
            </div>

             <div className="flex items-center gap-2 pt-4">
              <Button asChild>
                <Link href={`/library/${book.id}/edit`}>
                  <FilePenLine className="mr-2 h-4 w-4" /> Editar
                </Link>
              </Button>
              <DeleteBookDialog bookId={book.id} />
              <Button variant="ghost" asChild>
                  <Link href="/library">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a Biblioteca
                  </Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}