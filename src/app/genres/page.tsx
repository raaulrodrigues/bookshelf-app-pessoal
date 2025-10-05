import { GenreCard } from "@/app/genres/GenreCard";
import { getGenres } from "@/lib/actions";

export default async function GenresPage() {
  const genres = await getGenres();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Explorar por Gênero</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {genres.map((genre) => (
          <GenreCard key={genre.name} genre={genre} />
        ))}
      </div>
    </div>
  );
}