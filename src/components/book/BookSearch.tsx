'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  BookFromGoogle,
  searchGoogleBooks,
} from '@/app/actions/searchGoogleBooks';

interface BookSearchProps {
  onBookSelect: (book: BookFromGoogle) => Promise<void>;
}

export function BookSearch({ onBookSelect }: BookSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BookFromGoogle[]>([]);
  const [loading, setLoading] = useState(false);
  const [addedBooks, setAddedBooks] = useState<Set<string>>(new Set());

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query) return;
    setLoading(true);
    setAddedBooks(new Set());
    const books = await searchGoogleBooks(query);
    setResults(books);
    setLoading(false);
  };

  const handleSelect = async (book: BookFromGoogle) => {
    await onBookSelect(book);
    setAddedBooks((prev) => new Set(prev).add(book.id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar por título ou autor..."
          className="flex-grow p-2 border rounded-md text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      <div className="space-y-4">
        {results.map((book) => (
          <div
            key={book.id}
            className="flex items-center gap-4 p-4 border rounded-md shadow-sm"
          >
            <Image
              src={book.coverUrl}
              alt={`Capa do livro ${book.title}`}
              width={80}
              height={120}
              className="object-cover rounded-md"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-gray-400">{book.authors.join(', ')}</p>
            </div>
            <button
              onClick={() => handleSelect(book)}
              disabled={addedBooks.has(book.id)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {addedBooks.has(book.id) ? 'Adicionado' : 'Adicionar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}