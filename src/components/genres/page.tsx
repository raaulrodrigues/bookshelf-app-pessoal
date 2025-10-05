import { DeleteGenreDialog } from "@/components/genres/DeleteGenreDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createGenre, getGenres } from "@/lib/actions";

export default async function GenresPage() {
  const genres = await getGenres();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Gênero</CardTitle>
              <CardDescription>
                Crie uma nova categoria para seus livros.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createGenre} className="flex gap-2">
                <Input name="name" placeholder="Ex: Terror" required />
                <Button type="submit">Salvar</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Gêneros Existentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {genres.map((genre) => (
                    <TableRow key={genre.name}>
                      <TableCell className="font-medium">{genre.name}</TableCell>
                      <TableCell className="text-right">
                        <DeleteGenreDialog name={genre.name} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}