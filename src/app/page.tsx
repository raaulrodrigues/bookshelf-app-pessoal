import { getBooks } from "@/lib/actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book, CheckCircle, Hourglass, Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const books = await getBooks();

  const totalBooks = books.length;
  const currentlyReading = books.filter(b => b.status === "LENDO").length;
  const finishedBooks = books.filter(b => b.status === "LIDO").length;
  const totalPagesRead = books
    .filter(b => b.status === "LIDO" || b.status === "LENDO")
    .reduce((acc, book) => {
      if (book.status === "LIDO" && book.pages) return acc + book.pages;
      if (book.status === "LENDO" && book.currentPage) return acc + book.currentPage;
      return acc;
    }, 0);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 font-serif">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Livros</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lendo Atualmente</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentlyReading}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livros Finalizados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{finishedBooks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Páginas Lidas</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPagesRead.toLocaleString('pt-BR')}</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Button asChild>
          <Link href="/library">Ver Biblioteca Completa</Link>
        </Button>
      </div>
    </div>
  );
}