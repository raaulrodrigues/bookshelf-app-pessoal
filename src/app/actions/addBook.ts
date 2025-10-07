'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface AddBookProps {
  title: string;
  author: string;
  coverUrl: string;
  status: string;
}

export async function addBook({
  title,
  author,
  coverUrl,
  status,
}: AddBookProps) {
  await prisma.book.create({
    data: {
      title,
      author,
      coverUrl,
      status,
    },
  });

  revalidatePath('/');
}