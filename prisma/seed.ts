import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const booksData = [
  { title: "Carta ao Pai", author: "Franz Kafka", genre: "Biografia", year: 1919, pages: 128, rating: 5, synopsis: "Uma carta devastadora e nunca entregue de Kafka ao seu pai, explorando a complexa e opressiva relação entre os dois e o impacto disso em sua vida e obra.", cover: "/covers/carta-ao-pai.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "A Metamorfose", author: "Franz Kafka", genre: "Ficção", year: 1915, pages: 96, rating: 5, synopsis: "A história surreal e angustiante de Gregor Samsa, um caixeiro-viajante que um dia acorda transformado em um inseto monstruoso.", cover: "/covers/metamorfose.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "Noites Brancas", author: "Fiódor Dostoiévski", genre: "Romance", year: 1848, pages: 96, rating: 4, synopsis: "Em São Petersburgo, um sonhador solitário conhece uma jovem durante quatro noites mágicas, vivendo um breve e melancólico romance.", cover: "/covers/noites-brancas.jpg", publisher: "Editora 34", language: "Português", series: "" },
  { title: "Os Irmãos Karamázov", author: "Fiódor Dostoiévski", genre: "Filosofia", year: 1880, pages: 840, rating: 5, synopsis: "O último e mais grandioso romance de Dostoiévski, que mergulha em questões de fé, dúvida, e moralidade através do parricídio que envolve os três irmãos Karamázov e seu pai.", cover: "/covers/irmaos-karamazov.jpg", publisher: "Editora 34", language: "Português", series: "" },
  { title: "Memórias do Subsolo", author: "Fiódor Dostoiévski", genre: "Filosofia", year: 1864, pages: 160, rating: 5, synopsis: "O monólogo de um homem amargo e paradoxal que expõe a irracionalidade da natureza humana como uma rebelião contra o determinismo. Uma obra seminal do existencialismo.", cover: "/covers/memorias-subsolo.jpg", publisher: "Editora 34", language: "Português", series: "" },
  { title: "Crime e Castigo", author: "Fiódor Dostoiévski", genre: "Ficção", year: 1866, pages: 560, rating: 5, synopsis: "A história de Raskólnikov, um jovem estudante que comete um assassinato para testar suas teorias morais e é levado a uma jornada psicológica de culpa, tormento e busca por redenção.", cover: "/covers/crime-e-castigo.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "Um Artista da Fome", author: "Franz Kafka", genre: "Ficção", year: 1922, pages: 104, rating: 4, synopsis: "Uma coletânea de contos que explora a alienação e o absurdo, incluindo a história de um artista cujo único talento é o jejum público, mas que se torna obsoleto num mundo que já não o compreende.", cover: "/covers/artista-fome.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "O Castelo", author: "Franz Kafka", genre: "Ficção", year: 1926, pages: 368, rating: 4, synopsis: "Um romance inacabado sobre K., um agrimensor que luta para conseguir acesso a um misterioso castelo e às autoridades que o governam, numa batalha fútil contra uma burocracia impenetrável e labiríntica.", cover: "/covers/o-castelo.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "A Náusea", author: "Jean-Paul Sartre", genre: "Filosofia", year: 1938, pages: 240, rating: 5, synopsis: "Em forma de diário, o historiador Antoine Roquentin registra sua 'náusea', uma sensação avassaladora da contingência e do absurdo da existência ao confrontar a realidade nua e crua dos objetos e de si mesmo.", cover: "/covers/a-nausea.jpg", publisher: "Nova Fronteira", language: "Português", series: "" },
  { title: "A Peste", author: "Albert Camus", genre: "Ficção", year: 1947, pages: 304, rating: 5, synopsis: "Uma alegoria sobre a resistência humana e a solidariedade diante do absurdo, narrando a luta de uma cidade argelina isolada por uma epidemia devastadora.", cover: "/covers/a-peste.jpg", publisher: "Record", language: "Português", series: "" },
  { title: "Memórias Póstumas de Brás Cubas", author: "Machado de Assis", genre: "Literatura Brasileira", year: 1881, pages: 256, rating: 5, synopsis: "Um 'defunto autor' narra sua vida com ironia, pessimismo e digressões filosóficas, expondo a mediocridade da elite de seu tempo. Uma obra revolucionária da literatura mundial.", cover: "/covers/memorias-postumas.jpg", publisher: "Principis", language: "Português", series: "" },
  { title: "O Diário de Anne Frank", author: "Anne Frank", genre: "Biografia", year: 1947, pages: 352, rating: 5, synopsis: "O testemunho íntimo e comovente de uma jovem judia escondida dos nazistas durante a Segunda Guerra Mundial, um símbolo da resiliência humana e um relato poderoso sobre a adolescência em meio ao terror.", cover: "/covers/anne-frank.jpg", publisher: "Record", language: "Português", series: "" },
  { title: "Coraline", author: "Neil Gaiman", genre: "Fantasia", year: 2002, pages: 162, rating: 5, synopsis: "Uma jovem descobre uma porta secreta para uma versão alternativa e sinistra de sua vida, com uma 'Outra Mãe' que a quer para sempre. Um conto de fadas sombrio e arrepiante.", cover: "/covers/coraline.jpg", publisher: "Intrínseca", language: "Português", series: "" },
  { title: "Jurassic Park", author: "Michael Crichton", genre: "Ficção Científica", year: 1990, pages: 448, rating: 5, synopsis: "A teoria do caos se torna realidade quando um parque temático com dinossauros clonados sai terrivelmente do controle, transformando o sonho em um pesadelo de sobrevivência.", cover: "/covers/jurassic-park.jpg", publisher: "Aleph", language: "Português", series: "Jurassic Park (Livro 1)" },
  { title: "O Mundo Perdido", author: "Michael Crichton", genre: "Ficção Científica", year: 1995, pages: 432, rating: 4, synopsis: "Ian Malcolm retorna a uma outra ilha cheia de dinossauros para uma nova e perigosa expedição de resgate, descobrindo que a natureza encontrou um caminho para prosperar sem a intervenção humana.", cover: "/covers/o-mundo-perdido.jpg", publisher: "Aleph", language: "Português", series: "Jurassic Park (Livro 2)" },
  { title: "Heartstopper: Volume 1", author: "Alice Oseman", genre: "Romance", year: 2019, pages: 288, rating: 5, synopsis: "Charlie, um garoto abertamente gay e ansioso, e Nick, um jogador de rúgbi alegre e de bom coração, se conhecem e descobrem que sua amizade pode ser algo mais.", cover: "/covers/heartstopper-1.jpg", publisher: "Seguinte", language: "Português", series: "Heartstopper (Livro 1)" },
  { title: "Five Nights at Freddy's: Olhos Prateados", author: "Scott Cawthon & Kira Breed-Wrisley", genre: "Terror", year: 2015, pages: 432, rating: 4, synopsis: "Dez anos após os assassinatos na Freddy Fazbear's Pizza, Charlie e seus amigos de infância se reúnem e se encontram presos na pizzaria abandonada com seus animatrônicos mortais.", cover: "/covers/fnaf-olhos-prateados.jpg", publisher: "Intrínseca", language: "Português", series: "Five Nights at Freddy's (Trilogia 1, Livro 1)" },
  { title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", genre: "Fantasia", year: 1997, pages: 223, rating: 5, synopsis: "Harry Potter descobre no seu 11º aniversário que é um bruxo e que uma vaga o aguarda na Escola de Magia e Bruxaria de Hogwarts.", cover: "/covers/pedra-filosofal.jpg", publisher: "Rocco", language: "Português", series: "Harry Potter (Livro 1)" },
  { title: "A Guerra dos Tronos", author: "George R. R. Martin", genre: "Fantasia", year: 1996, pages: 592, rating: 5, synopsis: "Nos Sete Reinos de Westeros, a luta pelo Trono de Ferro começa entre as grandes casas nobres, desencadeando uma guerra de traição, poder e honra.", cover: "/covers/a-guerra-dos-tronos.jpg", publisher: "Suma", language: "Português", series: "As Crônicas de Gelo e Fogo (Livro 1)" },
  { title: "O Hobbit", author: "J.R.R. Tolkien", genre: "Fantasia", year: 1937, pages: 310, rating: 5, synopsis: 'A jornada inesperada de Bilbo Bolseiro, um hobbit que é levado a uma grande aventura para recuperar um tesouro guardado pelo dragão Smaug.', cover: "/covers/hobbit.jpg", publisher: "HarperCollins", language: "Português", series: "" },
  { title: "Código Limpo", author: "Robert C. Martin", genre: "Tecnologia", year: 2008, pages: 464, rating: 5, synopsis: "Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com uma empresa de desenvolvimento. Este livro descreve os princípios, padrões e práticas para criar um código limpo.", cover: "/covers/codigo-limpo.jpg", publisher: "Alta Books", language: "Português", series: "" },
  { title: "O Programador Pragmático", author: "Andrew Hunt, David Thomas", genre: "Tecnologia", year: 1999, pages: 352, rating: 5, synopsis: "Ilustra as melhores práticas e as principais armadilhas do desenvolvimento de software. Apresenta lições que promovem melhorias na produtividade pessoal, precisão e satisfação profissional.", cover: "/covers/o-programador-pragmatico.jpg", publisher: "Bookman", language: "Português", series: "" },
  { title: "Assim Falou Zaratustra", author: "Friedrich Nietzsche", genre: "Filosofia", year: 1883, pages: 400, rating: 5, synopsis: "O mais famoso livro de Nietzsche, que relata as andanças e discursos do profeta Zaratustra, que desce de seu esconderijo nas montanhas para pregar aos homens sobre o 'super-homem' e a morte de Deus.", cover: "/covers/zaratustra.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "O Lobo da Estepe", author: "Hermann Hesse", genre: "Ficção", year: 1927, pages: 240, rating: 5, synopsis: "A história de Harry Haller, um homem que se sente dividido entre sua natureza humana e sua 'besta' interior, o lobo da estepe. Uma profunda exploração da crise espiritual do homem moderno.", cover: "/covers/o-lobo-da-estepe.jpg", publisher: "Record", language: "Português", series: "" },
  { title: "O Processo", author: "Franz Kafka", genre: "Ficção", year: 1925, pages: 288, rating: 5, synopsis: "Josef K., um bancário, é subitamente detido por um crime que desconhece e se vê enredado em um sistema judiciário labiríntico e opressor, numa luta para provar sua inocência.", cover: "/covers/o-processo.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "O Estrangeiro", author: "Albert Camus", genre: "Filosofia", year: 1942, pages: 160, rating: 5, synopsis: "Meursault, um homem apático e indiferente à morte da mãe e ao amor, comete um crime sem motivo aparente e é julgado mais por sua falta de emoção do que pelo ato em si. Uma obra-prima sobre o absurdo.", cover: "/covers/o-estrangeiro.jpg", publisher: "Record", language: "Português", series: "" },
  { title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", genre: "Fantasia", year: 1943, pages: 96, rating: 5, synopsis: "Um piloto de avião cai no deserto do Saara e encontra um pequeno príncipe vindo de outro planeta. Uma história poética sobre amizade, amor e a perda da inocência.", cover: "/covers/o-pequeno-principe.jpg", publisher: "Agir", language: "Português", series: "" },
  { title: "1984", author: "George Orwell", genre: "Ficção Científica", year: 1949, pages: 328, rating: 5, synopsis: "Em um futuro distópico, o Grande Irmão vigia a todos. Winston Smith, um funcionário do Partido, se rebela contra o regime totalitário que controla a história, o pensamento e a verdade.", cover: "/covers/1984.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "Solitaire", author: "Alice Oseman", genre: "Romance", year: 2014, pages: 400, rating: 4, synopsis: "Tori Spring é uma adolescente pessimista que não acredita em amizade ou amor. Mas quando um blog anônimo chamado 'Solitaire' começa a fazer pegadinhas cada vez mais perigosas em sua escola, ela é forçada a sair de sua zona de conforto.", cover: "/covers/solitaire.jpg", publisher: "Seguinte", language: "Português", series: "" },
  { title: "Harry Potter e o Enigma do Príncipe", author: "J.K. Rowling", genre: "Fantasia", year: 2005, pages: 432, rating: 5, synopsis: "No sexto ano de Harry em Hogwarts, ele descobre mais sobre o passado sombrio de Lord Voldemort com a ajuda de Dumbledore, enquanto o poder do Lorde das Trevas cresce e a guerra se aproxima.", cover: "/covers/enigma-do-principe.jpg", publisher: "Rocco", language: "Português", series: "Harry Potter (Livro 6)" },
  { title: "Sapiens: Uma Breve História da Humanidade", author: "Yuval Noah Harari", genre: "História", year: 2011, pages: 464, rating: 5, synopsis: "Desde as origens da nossa espécie até a era do capitalismo e da engenharia genética, Sapiens é uma viagem arrebatadora pela história da humanidade, que nos obriga a repensar o que significa ser humano.", cover: "/covers/sapiens.jpg", publisher: "L&PM", language: "Português", series: "" },
  { title: "Code: A Linguagem Secreta dos Computadores", author: "Charles Petzold", genre: "Tecnologia", year: 2000, pages: 448, rating: 5, synopsis: "Uma exploração brilhante de como os computadores funcionam. Começando com conceitos simples como o código Morse e o braile, Petzold nos guia passo a passo pela construção de um computador a partir de componentes básicos.", cover: "/covers/code.jpg", publisher: "Bookman", language: "Português", series: "" }
];

async function main() {
  await prisma.book.deleteMany({});
  await prisma.genre.deleteMany({});

  const uniqueGenres = [...new Set(booksData.map(book => book.genre).filter(Boolean))];

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
        publisher: book.publisher,
        language: book.language,
        series: book.series,
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