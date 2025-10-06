import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const booksData = [
  { title: "A Náusea", author: "Jean-Paul Sartre", genre: "Filosofia", year: 1938, pages: 240, rating: 5, synopsis: "Em forma de diário, o historiador Antoine Roquentin registra sua 'náusea', uma sensação avassaladora da contingência e do absurdo da existência ao confrontar a realidade nua и crua dos objetos e de si mesmo.", cover: "/covers/a-nausea.jpg", publisher: "Nova Fronteira", language: "Português", series: "" },
  { title: "Anna Karenina", author: "Liev Tolstói", genre: "Romance", year: 1877, pages: 840, rating: 5, synopsis: "A trágica história de uma aristocrata russa casada que tem um caso extraconjugal com o Conde Vronsky, desafiando as convenções sociais e enfrentando as consequências devastadoras de suas escolhas.", cover: "/covers/anna-karenina.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "O Diário de Anne Frank", author: "Anne Frank", genre: "Biografia", year: 1947, pages: 352, rating: 5, synopsis: "O testemunho íntimo e comovente de uma jovem judia escondida dos nazistas durante a Segunda Guerra Mundial, um símbolo da resiliência humana e um relato poderoso sobre a adolescência em meio ao terror.", cover: "/covers/anne-frank.jpg", publisher: "Record", language: "Português", series: "" },
  { title: "A Peste", author: "Albert Camus", genre: "Ficção", year: 1947, pages: 304, rating: 5, synopsis: "Uma alegoria sobre a resistência humana e a solidariedade diante do absurdo, narrando a luta de uma cidade argelina isolada por uma epidemia devastadora.", cover: "/covers/a-peste.jpg", publisher: "Record", language: "Português", series: "" },
  { title: "Um Artista da Fome", author: "Franz Kafka", genre: "Ficção", year: 1922, pages: 104, rating: 4, synopsis: "Uma coletânea de contos que explora a alienação e o absurdo, incluindo a história de um artista cujo único talento é o jejum público, mas que se torna obsoleto num mundo que já não o compreende.", cover: "/covers/artista-fome.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "Carta ao Pai", author: "Franz Kafka", genre: "Biografia", year: 1919, pages: 128, rating: 5, synopsis: "Escrita em 1919, esta que é uma das mais importantes cartas da literatura universal jamais chegou ao seu destino. Nela, o autor de A metamorfose expõe as incompatibilidades e a relação conflituosa entre um filho artista e um pai autoritário.", cover: "/covers/carta-ao-pai.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "Coraline", author: "Neil Gaiman", genre: "Fantasia", year: 2002, pages: 162, rating: 5, synopsis: "Uma jovem descobre uma porta secreta para uma versão alternativa e sinistra de sua vida, com uma 'Outra Mãe' que a quer para sempre. Um conto de fadas sombrio e arrepiante.", cover: "/covers/coraline.jpg", publisher: "Intrínseca", language: "Português", series: "" },
  { title: "Crime e Castigo", author: "Fiódor Dostoiévski", genre: "Ficção", year: 1866, pages: 560, rating: 5, synopsis: "A história de Raskólnikov, um estudante pobre que comete um assassinato para testar suas teorias morais e é levado a uma jornada psicológica de culpa, tormento e busca por redenção.", cover: "/covers/crime-e-castigo.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "De Profundis", author: "Oscar Wilde", genre: "Biografia", year: 1905, pages: 160, rating: 5, synopsis: "Uma longa carta escrita por Oscar Wilde durante sua prisão, refletindo sobre sua vida, seu amor por Lord Alfred Douglas, sua espiritualidade e a natureza do sofrimento.", cover: "/covers/de-profundis.jpg", publisher: "L&PM Editores", language: "Português", series: "" },
  { title: "Five Nights at Freddy's: 1:35AM", author: "Scott Cawthon & Elley Cooper", genre: "Terror", year: 2020, pages: 240, rating: 4, synopsis: "A escuridão se aprofunda com mais três histórias assustadoras sobre uma jovem assombrada por um despertador e os perigos da engenharia reversa.", cover: "/covers/fnaf-135am.jpg", publisher: "Intrínseca", language: "Português", series: "Fazbear Frights (Livro 3)" },
  { title: "Five Nights at Freddy's: A Última Porta", author: "Scott Cawthon & Kira Breed-Wrisley", genre: "Terror", year: 2018, pages: 352, rating: 4, synopsis: "Na conclusão da trilogia original, Charlie enfrenta a verdade sobre seu pai e os segredos sombrios por trás da Fazbear Entertainment.", cover: "/covers/fnaf-a-ultima-porta.jpg", publisher: "Intrínseca", language: "Português", series: "Five Nights at Freddy's (Trilogia 1, Livro 3)" },
  { title: "Five Nights at Freddy's: Fetch", author: "Scott Cawthon & Carly Anne West", genre: "Terror", year: 2020, pages: 224, rating: 4, synopsis: "Três novas histórias de terror, incluindo um animatrônico que busca itens via mensagens de texto e um jovem que se sente substituído.", cover: "/covers/fnaf-fetch.jpg", publisher: "Intrínseca", language: "Português", series: "Fazbear Frights (Livro 2)" },
  { title: "Five Nights at Freddy's: Into the Pit", author: "Scott Cawthon & Elley Cooper", genre: "Terror", year: 2019, pages: 224, rating: 4, synopsis: "A primeira da série Fazbear Frights, apresentando três contos sinistros sobre desejos sombrios, um animatrônico implacável e viagens no tempo na pizzaria original.", cover: "/covers/fnaf-into-the-pit.jpg", publisher: "Intrínseca", language: "Português", series: "Fazbear Frights (Livro 1)" },
  { title: "Five Nights at Freddy's: Olhos Prateados", author: "Scott Cawthon & Kira Breed-Wrisley", genre: "Terror", year: 2015, pages: 432, rating: 4, synopsis: "Dez anos após os assassinatos na Freddy Fazbear's Pizza, Charlie e seus amigos de infância se reúnem e se encontram presos na pizzaria abandonada com seus animatrônicos mortais.", cover: "/covers/fnaf-olhos-prateados.jpg", publisher: "Intrínseca", language: "Português", series: "Five Nights at Freddy's (Trilogia 1, Livro 1)" },
  { title: "Five Nights at Freddy's: Os Distorcidos", author: "Scott Cawthon & Kira Breed-Wrisley", genre: "Terror", year: 2017, pages: 304, rating: 4, synopsis: "Um ano após os eventos de 'Olhos Prateados', Charlie se vê assombrada por novos animatrônicos ainda mais grotescos e aterrorizantes que parecem caçá-la.", cover: "/covers/fnaf-os-distorcidos.jpg", publisher: "Intrínseca", language: "Português", series: "Five Nights at Freddy's (Trilogia 1, Livro 2)" },
  { title: "Heartstopper: Volume 1", author: "Alice Oseman", genre: "Romance", year: 2019, pages: 288, rating: 5, synopsis: "Charlie, um garoto abertamente gay e ansioso, e Nick, um jogador de rúgbi alegre e de bom coração, se conhecem e descobrem que sua amizade pode ser algo mais.", cover: "/covers/heartstopper-1.jpg", publisher: "Seguinte", language: "Português", series: "Heartstopper (Livro 1)" },
  { title: "Heartstopper: Volume 2", author: "Alice Oseman", genre: "Romance", year: 2019, pages: 320, rating: 5, synopsis: "Nick e Charlie navegam seus sentimentos um pelo outro enquanto lidam com as complexidades de sair do armário e os primeiros passos de um relacionamento.", cover: "/covers/heartstopper-2.jpg", publisher: "Seguinte", language: "Português", series: "Heartstopper (Livro 2)" },
  { title: "Heartstopper: Volume 3", author: "Alice Oseman", genre: "Romance", year: 2020, pages: 384, rating: 5, synopsis: "O relacionamento de Nick e Charlie se aprofunda durante uma viagem escolar a Paris, mas novos desafios e inseguranças surgem no caminho.", cover: "/covers/heartstopper-3.jpg", publisher: "Seguinte", language: "Português", series: "Heartstopper (Livro 3)" },
  { title: "Heartstopper: Volume 4", author: "Alice Oseman", genre: "Romance", year: 2021, pages: 384, rating: 5, synopsis: "Charlie e Nick dizem 'eu te amo' e enfrentam juntos as dificuldades dos transtornos alimentares e da saúde mental de Charlie, fortalecendo seu vínculo.", cover: "/covers/heartstopper-4.jpg", publisher: "Seguinte", language: "Português", series: "Heartstopper (Livro 4)" },
  { title: "A Hora da Estrela", author: "Clarice Lispector", genre: "Literatura Brasileira", year: 1977, pages: 88, rating: 5, synopsis: "A história de Macabéa, uma datilógrafa alagoana no Rio de Janeiro, cuja vida anônima e miserável é narrada por um escritor, Rodrigo S.M., numa profunda reflexão sobre a pobreza, a identidade e o ato de escrever.", cover: "/covers/hora-estrela.jpg", publisher: "Rocco", language: "Português", series: "" },
  { title: "Os Irmãos Karamázov", author: "Fiódor Dostoiévski", genre: "Filosofia", year: 1880, pages: 840, rating: 5, synopsis: "O último e mais grandioso romance de Dostoiévski, que mergulha em questões de fé, dúvida, e moralidade através do parricídio que envolve os três irmãos Karamázov e seu pai.", cover: "/covers/irmaos-karamazov.jpg", publisher: "Editora 34", language: "Português", series: "" },
  { title: "Jurassic Park", author: "Michael Crichton", genre: "Ficção Científica", year: 1990, pages: 448, rating: 5, synopsis: "A teoria do caos se torna realidade quando um parque temático com dinossauros clonados sai terrivelmente do controle, transformando o sonho em um pesadelo de sobrevivência.", cover: "/covers/jurassic-park.jpg", publisher: "Aleph", language: "Português", series: "Jurassic Park (Livro 1)" },
  { title: "A Autobiografia de Malcolm X", author: "Malcolm X & Alex Haley", genre: "Biografia", year: 1965, pages: 528, rating: 5, synopsis: "O relato poderoso da vida de Malcolm X, desde sua infância conturbada, passando pela sua conversão ao Islã, até sua transformação em um dos mais influentes líderes do movimento dos direitos civis nos Estados Unidos.", cover: "/covers/malcolm-x.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "Memórias Póstumas de Brás Cubas", author: "Machado de Assis", genre: "Literatura Brasileira", year: 1881, pages: 256, rating: 5, synopsis: "Um 'defunto autor' narra sua vida com ironia, pessimismo e digressões filosóficas, expondo a mediocridade da elite de seu tempo. Uma obra revolucionária da literatura mundial.", cover: "/covers/memorias-postumas.jpg", publisher: "Principis", language: "Português", series: "" },
  { title: "Memórias do Subsolo", author: "Fiódor Dostoiévski", genre: "Filosofia", year: 1864, pages: 160, rating: 5, synopsis: "O monólogo de um homem amargo e paradoxal que expõe a irracionalidade da natureza humana como uma rebelião contra o determinismo. Uma obra seminal do existencialismo.", cover: "/covers/memorias-subsolo.jpg", publisher: "Editora 34", language: "Português", series: "" },
  { title: "A Metamorfose", author: "Franz Kafka", genre: "Ficção", year: 1915, pages: 96, rating: 5, synopsis: "Nesta que é sua mais célebre novela, Kafka narra a história do caixeiro-viajante Gregor Samsa, que um dia acorda transformado num inseto monstruoso. A partir daí, a história aborda o isolamento, a angústia e a inadequação do indivíduo perante uma sociedade opressora.", cover: "/covers/metamorfose.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "O Mito de Sísifo", author: "Albert Camus", genre: "Filosofia", year: 1942, pages: 144, rating: 5, synopsis: "Um ensaio filosófico fundamental sobre o absurdo da existência. Camus argumenta que devemos abraçar o absurdo e encontrar significado e liberdade na revolta, mesmo que a vida seja uma luta fútil como a de Sísifo.", cover: "/covers/mito-sisifo.jpg", publisher: "Record", language: "Português", series: "" },
  { title: "O Morro dos Ventos Uivantes", author: "Emily Brontë", genre: "Romance", year: 1847, pages: 352, rating: 5, synopsis: "Uma história sombria e apaixonada sobre o amor obsessivo e destrutivo entre Catherine Earnshaw e Heathcliff, um enigmático órfão acolhido por sua família.", cover: "/covers/morro-ventos-uivantes.jpg", publisher: "Principis", language: "Português", series: "" },
  { title: "Noites Brancas", author: "Fiódor Dostoiévski", genre: "Romance", year: 1848, pages: 96, rating: 4, synopsis: "Um romance sentimental sobre um sonhador solitário que, durante as noites brancas de São Petersburgo, conhece uma jovem e se apaixona, vivendo dias de fantasia em meio à solidão.", cover: "/covers/noites-brancas.jpg", publisher: "Editora 34", language: "Português", series: "" },
  { title: "O Castelo", author: "Franz Kafka", genre: "Ficção", year: 1926, pages: 368, rating: 4, synopsis: "Um romance inacabado sobre K., um agrimensor que luta para conseguir acesso a um misterioso castelo e às autoridades que o governam, numa batalha fútil contra uma burocracia impenetrável e labiríntica.", cover: "/covers/o-castelo.jpg", publisher: "Companhia das Letras", language: "Português", series: "" },
  { title: "O Cortiço", author: "Aluísio Azevedo", genre: "Literatura Brasileira", year: 1890, pages: 256, rating: 5, synopsis: "Um marco do Naturalismo brasileiro, o romance retrata a vida em uma habitação coletiva no Rio de Janeiro, expondo a miséria, a exploração e as paixões de seus diversos moradores.", cover: "/covers/o-cortico.jpg", publisher: "Principis", language: "Português", series: "" },
  { title: "O Mundo Perdido", author: "Michael Crichton", genre: "Ficção Científica", year: 1995, pages: 432, rating: 4, synopsis: "Ian Malcolm retorna a uma outra ilha cheia de dinossauros para uma nova e perigosa expedição de resgate, descobrindo que a natureza encontrou um caminho para prosperar sem a intervenção humana.", cover: "/covers/o-mundo-perdido.jpg", publisher: "Aleph", language: "Português", series: "Jurassic Park (Livro 2)" },
  { title: "Orgulho e Preconceito", author: "Jane Austen", genre: "Romance", year: 1813, pages: 304, rating: 5, synopsis: "A espirituosa Elizabeth Bennet e o orgulhoso Sr. Darcy enfrentam as convenções sociais, os mal-entendidos e seus próprios preconceitos em uma das mais célebres histórias de amor da literatura.", cover: "/covers/orgulho-e-preconceito.jpg", publisher: "Martin Claret", language: "Português", series: "" },
  { title: "Vidas Secas", author: "Graciliano Ramos", genre: "Literatura Brasileira", year: 1938, pages: 176, rating: 5, synopsis: "A jornada brutal de uma família de retirantes nordestinos que foge da seca. Com uma linguagem enxuta e poderosa, o romance retrata a luta pela sobrevivência e a condição humana no seu limite.", cover: "/covers/vidas-secas.jpg", publisher: "Record", language: "Português", series: "" }
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