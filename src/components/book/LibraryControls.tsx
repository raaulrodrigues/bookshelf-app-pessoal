"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Genre } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface LibraryControlsProps {
  genres: Genre[];
}

const sortOptions = [
  { value: 'createdAt_desc', label: 'Mais Recentes' },
  { value: 'title_asc', label: 'Título (A-Z)' },
  { value: 'title_desc', label: 'Título (Z-A)' },
  { value: 'rating_desc', label: 'Melhor Avaliados' },
  { value: 'year_desc', label: 'Lançamento (Mais Novo)' },
  { value: 'year_asc', label: 'Lançamento (Mais Antigo)' },
];

export function LibraryControls({ genres }: LibraryControlsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleFilterChange = (value: string, filter: 'genre' | 'sortBy') => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Input
        type="search"
        placeholder="Buscar por título ou autor..."
        className="flex-1"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Select
        onValueChange={(value) => handleFilterChange(value, 'genre')}
        defaultValue={searchParams.get("genre")?.toString()}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filtrar por gênero" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Gêneros</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre.name} value={genre.name}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => handleFilterChange(value, 'sortBy')}
        defaultValue={searchParams.get("sortBy")?.toString()}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}