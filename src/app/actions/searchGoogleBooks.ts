'use server';

export interface BookFromGoogle {
  id: string;
  title: string;
  authors: string[];
  coverUrl: string;
}

export async function searchGoogleBooks(query: string): Promise<BookFromGoogle[]> {
  if (!query) {
    return [];
  }

  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query,
  )}&key=${apiKey}&maxResults=10&printType=books`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      return [];
    }

    const books: BookFromGoogle[] = data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title || 'Título desconhecido',
      authors: item.volumeInfo.authors || ['Autor desconhecido'],
      coverUrl:
        item.volumeInfo.imageLinks?.thumbnail ||
        item.volumeInfo.imageLinks?.smallThumbnail ||
        'https://via.placeholder.com/128x192.png?text=No+Cover',
    }));

    return books;
  } catch (error) {
    console.error('Error fetching from Google Books API:', error);
    return [];
  }
}