export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const totalBooks = await prisma.book.count();

    const readingBooks = await prisma.book.count({
      where: { status: 'LENDO' },
    });

    const finishedBooks = await prisma.book.count({
      where: { status: 'LIDO' },
    });

    const pagesReadResult = await prisma.book.aggregate({
      _sum: {
        pages: true,
      },
      where: {
        status: 'LIDO',
      },
    });

    const pagesReadFromFinished = pagesReadResult._sum.pages || 0;

    const currentlyReadingPages = await prisma.book.findMany({
      where: {
        status: 'LENDO',
      },
      select: {
        currentPage: true,
      },
    });

    const pagesReadFromReading = currentlyReadingPages.reduce(
      (acc, book) => acc + book.currentPage,
      0
    );

    const totalPagesRead = pagesReadFromFinished + pagesReadFromReading;

    return NextResponse.json({
      totalBooks,
      readingBooks,
      finishedBooks,
      totalPagesRead,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

