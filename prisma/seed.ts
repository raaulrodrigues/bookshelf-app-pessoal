import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const booksData = [
  { title: "Carta ao Pai", author: "Franz Kafka", genre: "Biografia", year: 1919, pages: 88, rating: 5, synopsis: "Uma carta nunca entregue...", cover: "/covers/carta-ao-pai.jpg" },
  { title: "A Metamorfose", author: "Franz Kafka", genre: "Ficção", year: 1915, pages: 96, rating: 5, synopsis: "A história surreal de Gregor Samsa...", cover: "/covers/metamorfose.jpg" },
  { title: "Noites Brancas", author: "Fiódor Dostoiévski", genre: "Romance", year: 1848, pages: 96, rating: 4, synopsis: "Um sonhador solitário encontra...", cover: "/covers/noites-brancas.jpg" },
  { title: "Os Irmãos Karamázov", author: "Fiódor Dostoiévski", genre: "Filosofia", year: 1880, pages: 840, rating: 5, synopsis: "O último e mais complexo romance...", cover: "/covers/irmaos-karamazov.jpg" },
  { title: "Memórias do Subsolo", author: "Fiódor Dostoiévski", genre: "Filosofia", year: 1864, pages: 160, rating: 5, synopsis: "Um monólogo de um homem amargo...", cover: "/covers/memorias-subsolo.jpg" },
  { title: "Crime e Castigo", author: "Fiódor Dostoiévski", genre: "Ficção", year: 1866, pages: 560, rating: 5, synopsis: "A história de Raskólnikov...", cover: "/covers/crime-e-castigo.jpg" },
  { title: "Um Artista da Fome", author: "Franz Kafka", genre: "Ficção", year: 1922, pages: 64, rating: 4, synopsis: "Uma coleção de contos...", cover: "/covers/artista-fome.jpg" },
  { title: "O Castelo", author: "Franz Kafka", genre: "Ficção", year: 1926, pages: 368, rating: 4, synopsis: "Um romance inacabado sobre K...", cover: "/covers/o-castelo.jpg" },
  { title: "A Náusea", author: "Jean-Paul Sartre", genre: "Filosofia", year: 1938, pages: 240, rating: 5, synopsis: "Um diário filosófico de Antoine...", cover: "/covers/a-nausea.jpg" },
  { title: "A Peste", author: "Albert Camus", genre: "Ficção", year: 1947, pages: 304, rating: 5, synopsis: "Uma alegoria sobre a resistência...", cover: "/covers/a-peste.jpg" },
  { title: "Memórias Póstumas de Brás Cubas", author: "Machado de Assis", genre: "Literatura Brasileira", year: 1881, pages: 256, rating: 5, synopsis: "Um 'defunto autor' narra sua vida...", cover: "/covers/memorias-postumas.jpg" },
  { title: "O Diário de Anne Frank", author: "Anne Frank", genre: "Biografia", year: 1947, pages: 352, rating: 5, synopsis: "O testemunho de uma jovem judia...", cover: "/covers/anne-frank.jpg" },
  { title: "A Autobiografia de Malcolm X", author: "Malcolm X, Alex Haley", genre: "Biografia", year: 1965, pages: 464, rating: 5, synopsis: "A história de transformação de Malcolm X...", cover: "/covers/malcolm-x.jpg" },
  { title: "De Profundis", author: "Oscar Wilde", genre: "Biografia", year: 1905, pages: 160, rating: 4, synopsis: "Uma carta pungente escrita por Oscar Wilde na prisão...", cover: "/covers/de-profundis.jpg" },
  { title: "Anna Karenina", author: "Liev Tolstói", genre: "Romance", year: 1877, pages: 864, rating: 5, synopsis: "Uma trágica história de amor e sociedade...", cover: "/covers/anna-karenina.jpg" },
  { title: "O Morro dos Ventos Uivantes", author: "Emily Brontë", genre: "Romance", year: 1847, pages: 416, rating: 4, synopsis: "Uma história de amor e vingança nas charnecas inglesas...", cover: "/covers/morro-ventos-uivantes.jpg" },
  { title: "Orgulho e Preconceito", author: "Jane Austen", genre: "Romance", year: 1813, pages: 432, rating: 5, synopsis: "A icônica história de Elizabeth Bennet e Mr. Darcy...", cover: "/covers/orgulho-e-preconceito.jpg" },
  { title: "O Mito de Sísifo", author: "Albert Camus", genre: "Filosofia", year: 1942, pages: 128, rating: 5, synopsis: "Um ensaio filosófico sobre o absurdo da existência...", cover: "/covers/mito-sisifo.jpg" },
  { title: "A Hora da Estrela", author: "Clarice Lispector", genre: "Literatura Brasileira", year: 1977, pages: 88, rating: 5, synopsis: "A história de Macabéa, uma nordestina no Rio de Janeiro...", cover: "/covers/hora-estrela.jpg" },
  { title: "O Cortiço", author: "Aluísio Azevedo", genre: "Literatura Brasileira", year: 1890, pages: 288, rating: 4, synopsis: "Um retrato naturalista da vida em um cortiço no Rio de Janeiro...", cover: "/covers/o-cortico.jpg" },
  { title: "Vidas Secas", author: "Graciliano Ramos", genre: "Literatura Brasileira", year: 1938, pages: 176, rating: 5, synopsis: "A luta de uma família de retirantes nordestinos...", cover: "/covers/vidas-secas.jpg" },
  { title: "Coraline", author: "Neil Gaiman", genre: "Fantasia", year: 2002, pages: 162, rating: 5, synopsis: "Uma jovem descobre uma porta secreta para uma versão alternativa e sinistra de sua vida.", cover: "/covers/coraline.jpg" },
  { title: "Jurassic Park", author: "Michael Crichton", genre: "Ficção Científica", year: 1990, pages: 448, rating: 5, synopsis: "Um parque temático com dinossauros clonados sai terrivelmente do controle.", cover: "/covers/jurassic-park.jpg" },
  { title: "O Mundo Perdido", author: "Michael Crichton", genre: "Ficção Científica", year: 1995, pages: 432, rating: 4, synopsis: "Ian Malcolm retorna a uma outra ilha cheia de dinossauros para uma nova e perigosa expedição.", cover: "/covers/o-mundo-perdido.jpg" },
  { title: "Heartstopper: Volume 1", author: "Alice Oseman", genre: "Romance", year: 2019, pages: 288, rating: 5, synopsis: "Charlie e Nick se conhecem e descobrem que sua amizade pode ser algo mais.", cover: "/covers/heartstopper-1.jpg" },
  { title: "Heartstopper: Volume 2", author: "Alice Oseman", genre: "Romance", year: 2019, pages: 320, rating: 5, synopsis: "Nick e Charlie navegam seus sentimentos um pelo outro.", cover: "/covers/heartstopper-2.jpg" },
  { title: "Heartstopper: Volume 3", author: "Alice Oseman", genre: "Romance", year: 2020, pages: 384, rating: 5, synopsis: "O relacionamento de Nick e Charlie enfrenta novos desafios.", cover: "/covers/heartstopper-3.jpg" },
  { title: "Heartstopper: Volume 4", author: "Alice Oseman", genre: "Romance", year: 2021, pages: 384, rating: 5, synopsis: "Charlie e Nick lidam com questões de saúde mental e amor.", cover: "/covers/heartstopper-4.jpg" },
  { title: "Heartstopper: Volume 5", author: "Alice Oseman", genre: "Romance", year: 2023, pages: 336, rating: 5, synopsis: "Nick e Charlie olham para o futuro e a universidade.", cover: "/covers/heartstopper-5.jpg" },
  { title: "Five Nights at Freddy's: Olhos Prateados", author: "Scott Cawthon & Kira Breed-Wrisley", genre: "Terror", year: 2015, pages: 432, rating: 4, synopsis: "Um grupo de amigos retorna à pizzaria assombrada de sua infância.", cover: "/covers/fnaf-olhos-prateados.jpg" },
  { title: "Five Nights at Freddy's: Os Distorcidos", author: "Scott Cawthon & Kira Breed-Wrisley", genre: "Terror", year: 2017, pages: 304, rating: 4, synopsis: "Charlie se vê assombrada por novos animatrônicos ainda mais aterrorizantes.", cover: "/covers/fnaf-os-distorcidos.jpg" },
  { title: "Five Nights at Freddy's: A Última Porta", author: "Scott Cawthon & Kira Breed-Wrisley", genre: "Terror", year: 2018, pages: 352, rating: 4, synopsis: "A conclusão da trilogia original de FNaF.", cover: "/covers/fnaf-a-ultima-porta.jpg" },
  { title: "Five Nights at Freddy's: Into the Pit", author: "Scott Cawthon & Elley Cooper", genre: "Terror", year: 2019, pages: 224, rating: 4, synopsis: "Três contos sinistros do universo de Five Nights at Freddy's.", cover: "/covers/fnaf-into-the-pit.jpg" },
  { title: "Five Nights at Freddy's: Fetch", author: "Scott Cawthon & Carly Anne West", genre: "Terror", year: 2020, pages: 224, rating: 4, synopsis: "Mais três contos de terror sobre animatrônicos e crianças.", cover: "/covers/fnaf-fetch.jpg" },
  { title: "Five Nights at Freddy's: 1:35AM", author: "Scott Cawthon & Elley Cooper", genre: "Terror", year: 2020, pages: 240, rating: 4, synopsis: "A escuridão se aprofunda com mais três histórias assustadoras.", cover: "/covers/fnaf-135am.jpg" }
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

  for (const [index, book] of booksData.entries()) {
    await prisma.book.create({
      data: {
        id: String(index + 1),
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