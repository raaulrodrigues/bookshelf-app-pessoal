import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const booksData = [
  { id: "8f9b4f3b-d33a-4f5b-9d2d-7e7c8a3a0e1c", title: "Carta ao Pai", author: "Franz Kafka", genre: "Biografia", year: 1919, pages: 88, rating: 5, synopsis: "Uma carta nunca entregue...", cover: "/covers/carta-ao-pai.jpg" },
  { id: "a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6", title: "A Metamorfose", author: "Franz Kafka", genre: "Ficção", year: 1915, pages: 96, rating: 5, synopsis: "A história surreal de Gregor Samsa...", cover: "/covers/metamorfose.jpg" },
  { id: "b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7", title: "Noites Brancas", author: "Fiódor Dostoiévski", genre: "Romance", year: 1848, pages: 96, rating: 4, synopsis: "Um sonhador solitário encontra...", cover: "/covers/noites-brancas.jpg" },
  { id: "c3d4e5f6-a7b8-c9d0-e1f2-a3b4c5d6e7f8", title: "Os Irmãos Karamázov", author: "Fiódor Dostoiévski", genre: "Filosofia", year: 1880, pages: 840, rating: 5, synopsis: "O último e mais complexo romance...", cover: "/covers/irmaos-karamazov.jpg" },
  { id: "d4e5f6a7-b8c9-d0e1-f2a3b4c5d6e7f8g9", title: "Memórias do Subsolo", author: "Fiódor Dostoiévski", genre: "Filosofia", year: 1864, pages: 160, rating: 5, synopsis: "Um monólogo de um homem amargo...", cover: "/covers/memorias-subsolo.jpg" },
  { id: "e5f6a7b8-c9d0-e1f2-a3b4c5d6e7f8g9h0", title: "Crime e Castigo", author: "Fiódor Dostoiévski", genre: "Ficção", year: 1866, pages: 560, rating: 5, synopsis: "A história de Raskólnikov...", cover: "/covers/crime-e-castigo.jpg" },
  { id: "f6a7b8c9-d0e1-f2a3-b4c5-d6e7f8g9h0i1", title: "Um Artista da Fome", author: "Franz Kafka", genre: "Ficção", year: 1922, pages: 64, rating: 4, synopsis: "Uma coleção de contos...", cover: "/covers/artista-fome.jpg" },
  { id: "g7b8c9d0-e1f2-a3b4-c5d6-e7f8g9h0i1j2", title: "O Castelo", author: "Franz Kafka", genre: "Ficção", year: 1926, pages: 368, rating: 4, synopsis: "Um romance inacabado sobre K...", cover: "/covers/o-castelo.jpg" },
  { id: "h8c9d0e1-f2a3-b4c5-d6e7-f8g9h0i1j2k3", title: "A Náusea", author: "Jean-Paul Sartre", genre: "Filosofia", year: 1938, pages: 240, rating: 5, synopsis: "Um diário filosófico de Antoine...", cover: "/covers/a-nausea.jpg" },
  { id: "i9d0e1f2-a3b4-c5d6-e7f8-g9h0i1j2k3l4", title: "A Peste", author: "Albert Camus", genre: "Ficção", year: 1947, pages: 304, rating: 5, synopsis: "Uma alegoria sobre a resistência...", cover: "/covers/a-peste.jpg" },
  { id: "j0e1f2a3-b4c5-d6e7-f8g9-h0i1j2k3l4m5", title: "Memórias Póstumas de Brás Cubas", author: "Machado de Assis", genre: "Literatura Brasileira", year: 1881, pages: 256, rating: 5, synopsis: "Um 'defunto autor' narra sua vida...", cover: "/covers/memorias-postumas.jpg" }
];

async function main() {
  await prisma.book.deleteMany({});
  await prisma.genre.deleteMany({});

  const uniqueGenres = [...new Set(booksData.map(book => book.genre))];

  for (const genreName of uniqueGenres) {
    if (genreName) {
      await prisma.genre.create({
        data: { name: genreName },
      });
    }
  }

  for (const book of booksData) {
    await prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
        coverUrl: book.cover,
        year: book.year,
        pages: book.pages,
        rating: book.rating,
        synopsis: book.synopsis,
        genreName: book.genre,
        status: 'QUERO_LER',
        currentPage: 0,
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });