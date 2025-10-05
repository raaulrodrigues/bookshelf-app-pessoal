import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const bookSchema = z.object({
  title: z.string().min(2),
  author: z.string().min(2),
  coverUrl: z.string().optional(),
  genreName: z.string().optional(),
});

export async function GET() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    include: { genre: true },
  });
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = bookSchema.parse(json);
    
    const { genreName, ...bookData } = validatedData;

    const newBook = await prisma.book.create({
      data: {
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
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}