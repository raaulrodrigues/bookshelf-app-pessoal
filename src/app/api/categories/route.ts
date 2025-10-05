import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export async function GET() {
  const genres = await prisma.genre.findMany({
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(genres);
}

const genreSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = genreSchema.parse(json);

    const newGenre = await prisma.genre.create({
      data: {
        name: validatedData.name,
      },
    });

    return NextResponse.json(newGenre, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Este gênero já existe.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}