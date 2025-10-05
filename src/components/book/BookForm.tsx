"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { genres } from "@/types";
import { saveBook } from "@/lib/actions";
import { Book, ReadingStatus } from "@prisma/client";

const readingStatuses: ReadingStatus[] = [
  "QUERO_LER",
  "LENDO",
  "LIDO",
  "PAUSADO",
  "ABANDONADO",
];

interface BookFormProps {
  book?: Book & { genre?: { name: string } | null };
}

export function BookForm({ book }: BookFormProps) {
  const form = useForm();

  return (
    <Form {...form}>
      <form action={saveBook} className="space-y-8">
        {book && <input type="hidden" name="id" value={book.id} />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título *</FormLabel>
                <FormControl>
                  <Input placeholder="Clean Code" {...field} required defaultValue={book?.title}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autor *</FormLabel>
                <FormControl>
                  <Input placeholder="Robert C. Martin" {...field} required defaultValue={book?.author}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={form.control}
            name="coverUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Capa</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} defaultValue={book?.coverUrl ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select name={field.name} defaultValue={book?.status ?? "QUERO_LER"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {readingStatuses.map((s) => (
                      <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="genreName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Gênero</FormLabel>
                <Select name={field.name} defaultValue={book?.genre?.name}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {genres.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Páginas</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="464" {...field} defaultValue={book?.pages ?? ''}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nota (1-5)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={5} placeholder="5" {...field} defaultValue={book?.rating ?? ''}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Notas Pessoais</FormLabel>
                <FormControl>
                    <Textarea
                    placeholder="Suas anotações sobre o livro..."
                    className="resize-y"
                    {...field}
                    defaultValue={book?.notes ?? ''}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
          />
        <Button type="submit">{book ? "Salvar Alterações" : "Adicionar Livro"}</Button>
      </form>
    </Form>
  );
}