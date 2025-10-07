'use client';

import { BookSearch } from '@/components/book/BookSearch';
import { addBook } from '../actions/addBook';
import { BookFromGoogle } from '../actions/searchGoogleBooks';
import { toast } from 'sonner';

export default function SearchPage() {
  const handleAddBook = async (book: BookFromGoogle) => {
    try {
      await addBook({
        title: book.title,
        author: book.authors.join(', '),
        coverUrl: book.coverUrl,
        status: 'Quero Ler',
      });
      toast.success(`'${book.title}' foi adicionado com sucesso!`);
    } catch (error) {
      console.error('Falha ao adicionar o livro:', error);
      toast.error('Ocorreu um erro ao adicionar o livro.');
    }
  };

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">
        Adicionar Novo Livro
      </h1>
      <BookSearch onBookSelect={handleAddBook} />
    </main>
  );
}