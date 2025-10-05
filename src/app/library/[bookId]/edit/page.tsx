import { BookForm } from "@/components/book/BookForm";
import { Button } from "@/components/ui/button";
import { getBook } from "@/lib/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditBookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const book = await getBook(params.bookId);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/library/${book.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Editar: {book.title}</h1>
      </div>
      <BookForm book={book} />
    </div>
  );
}