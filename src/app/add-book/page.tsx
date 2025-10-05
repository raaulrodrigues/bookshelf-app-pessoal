import { BookForm } from "@/components/book/BookForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBookPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/library">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Adicionar Novo Livro</h1>
      </div>
      <BookForm />
    </div>
  );
}