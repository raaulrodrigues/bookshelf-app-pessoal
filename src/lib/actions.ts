"use server";

import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Book } from "@prisma/client";
import { notFound } from "next/navigation";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, { message: "O título precisa ter pelo menos 2 caracteres." }),
  author: z.string().min(2, { message: "O autor precisa ter pelo menos 2 caracteres." }),
  coverUrl: z.string().optional(),
  year: z.coerce.number().optional(),
  pages: z.coerce.number().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  synopsis: z.string().optional(),
  isbn: z.string().optional(),
  notes: z.string().optional(),
  publisher: z.string().optional(),
  language: z.string().optional(),
  series: z.string().optional(),
  currentPage: z.coerce.number().optional(),
  status: z.enum(["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"]),
  genreName: z.string().optional(),
});

export async function getBooks({
  query,
  genre,
  sortBy,
}: {
  query?: string;
  genre?: string;
  sortBy?: string;
} = {}) {
  const [field = "createdAt", direction = "desc"] = sortBy?.split("_") ?? [];

  const books = await prisma.book.findMany({
    where: {
      genreName: genre || undefined,
      OR: query
        ? [
            { title: { contains: query, mode: "insensitive" } },
            { author: { contains: query, mode: "insensitive" } },
          ]
        : undefined,
    },
    orderBy: { [field]: direction },
    include: { genre: true },
  });
  return books;
}

export async function getGenres() {
  const genres = await prisma.genre.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { books: true },
      },
      books: {
        take: 4,
        select: {
          coverUrl: true,
          id: true,
        },
      },
    },
  });
  return genres;
}

export async function getBook(id: string) {
  try {
    const book = await prisma.book.findUniqueOrThrow({
      where: { id },
      include: { genre: true },
    });
    return book;
  } catch (error) {
    notFound();
  }
}

export async function saveBook(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = formSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, genreName, ...bookData } = validatedFields.data;

  const dataToSave = {
    ...bookData,
    coverUrl: bookData.coverUrl || "",
    genre: genreName
      ? {
          connectOrCreate: {
            where: { name: genreName },
            create: { name: genreName },
          },
        }
      : undefined,
  };

  if (id) {
    await prisma.book.update({ where: { id }, data: dataToSave });
  } else {
    await prisma.book.create({ data: dataToSave });
  }

  revalidatePath("/library");
  if (id) {
    revalidatePath(`/library/${id}`);
  }
  redirect("/library");
}

export async function deleteBook(id: string) {
  await prisma.book.delete({
    where: { id },
  });
  revalidatePath("/library");
  redirect("/library");
}

const genreSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
});

export async function createGenre(formData: FormData) {
  const validatedFields = genreSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    throw new Error("Validation failed");
  }
  
  await prisma.genre.create({
    data: { name: validatedFields.data.name },
  });

  revalidatePath("/genres");
}

export async function deleteGenre(name: string) {
  await prisma.genre.delete({
    where: { name },
  });

  revalidatePath("/genres");
  revalidatePath("/library");
}

export async function searchGoogleBooks(query: string) {
  if (!query) return [];

  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!apiKey) {
    throw new Error("Google Books API key is missing");
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&maxResults=10&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Google Books API");
    }

    const data = await response.json();
    if (!data.items) return [];

    const books = data.items.map((item: any) => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Autor desconhecido",
      year: item.volumeInfo.publishedDate ? parseInt(item.volumeInfo.publishedDate.substring(0, 4)) : undefined,
      pages: item.volumeInfo.pageCount,
      synopsis: item.volumeInfo.description,
      publisher: item.volumeInfo.publisher,
      coverUrl: item.volumeInfo.imageLinks?.thumbnail || item.volumeInfo.imageLinks?.smallThumbnail || "",
      genreName: item.volumeInfo.categories ? item.volumeInfo.categories[0] : undefined,
    }));

    return books;
  } catch (error) {
    console.error("Error searching Google Books:", error);
    return [];
  }
}