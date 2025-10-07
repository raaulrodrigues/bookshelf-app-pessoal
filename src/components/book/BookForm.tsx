"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { genres, type ReadingStatus } from "@/types";
import { saveBook } from "@/lib/actions";
import { type Book } from "@prisma/client";
import { Label } from "@/components/ui/label";

const readingStatuses: ReadingStatus[] = [
  "QUERO_LER",
  "LENDO",
  "LIDO",
  "PAUSADO",
  "ABANDONADO",
];

type BookFormData = Partial<Book> & { genreName?: string | null };

interface BookFormProps {
  book?: BookFormData;
}

type FormState = {
  errors?: {
    title?: string[];
    author?: string[];
    coverUrl?: string[];
    pages?: string[];
    rating?: string[];
    notes?: string[];
  };
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending
        ? "Salvando..."
        : isEditing
        ? "Salvar Alterações"
        : "Adicionar Livro"}
    </Button>
  );
}

export function BookForm({ book }: BookFormProps) {
  const initialState: FormState = { errors: {} };
  const [state, dispatch] = useFormState(saveBook, initialState);

  return (
    <form action={dispatch} className="space-y-8">
      {book?.id && <input type="hidden" name="id" value={book.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input id="title" name="title" placeholder="Clean Code" required defaultValue={book?.title} />
          {state?.errors?.title && <p className="text-sm text-destructive mt-1">{state.errors.title.join(", ")}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Autor *</Label>
          <Input id="author" name="author" placeholder="Robert C. Martin" required defaultValue={book?.author} />
          {state?.errors?.author && <p className="text-sm text-destructive mt-1">{state.errors.author.join(", ")}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverUrl">URL da Capa</Label>
        <Input id="coverUrl" name="coverUrl" placeholder="https://..." defaultValue={book?.coverUrl ?? ""} />
        {state?.errors?.coverUrl && <p className="text-sm text-destructive mt-1">{state.errors.coverUrl.join(", ")}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={book?.status ?? "QUERO_LER"}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {readingStatuses.map((s) => (
                <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="genreName">Gênero</Label>
          <Select name="genreName" defaultValue={book?.genreName ?? undefined}>
            <SelectTrigger id="genreName">
              <SelectValue placeholder="Selecione o gênero" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pages">Páginas</Label>
          <Input id="pages" name="pages" type="number" placeholder="464" defaultValue={book?.pages ?? ""} />
          {state?.errors?.pages && <p className="text-sm text-destructive mt-1">{state.errors.pages.join(", ")}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">Nota (1-5)</Label>
          <Input id="rating" name="rating" type="number" min={1} max={5} placeholder="5" defaultValue={book?.rating ?? ""} />
          {state?.errors?.rating && <p className="text-sm text-destructive mt-1">{state.errors.rating.join(", ")}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notas Pessoais</Label>
        <Textarea id="notes" name="notes" placeholder="Suas anotações sobre o livro..." className="resize-y" defaultValue={book?.notes ?? ""} />
        {state?.errors?.notes && <p className="text-sm text-destructive mt-1">{state.errors.notes.join(", ")}</p>}
      </div>

      <SubmitButton isEditing={!!book?.id} />
    </form>
  );
}