import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { initialBooks } from "@/data/books";

export default function DashboardPage() {
  const totalBooks = initialBooks.length;
  const readingNow = initialBooks.filter(
    (book) => book.status === "LENDO"
  ).length;
  const finishedBooks = initialBooks.filter(
    (book) => book.status === "LIDO"
  ).length;

  const totalPagesRead = initialBooks.reduce((acc, book) => {
    if (book.status === "LIDO" && book.pages) {
      return acc + book.pages;
    }
    if (book.currentPage) {
      return acc + book.currentPage;
    }
    return acc;
  }, 0);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Livros</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalBooks}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lendo Atualmente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{readingNow}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Livros Finalizados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{finishedBooks}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total de Páginas Lidas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalPagesRead}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}