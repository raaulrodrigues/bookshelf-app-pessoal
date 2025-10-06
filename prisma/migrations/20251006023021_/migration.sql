-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "year" INTEGER,
    "pages" INTEGER,
    "rating" INTEGER,
    "synopsis" TEXT,
    "isbn" TEXT,
    "notes" TEXT,
    "publisher" TEXT,
    "language" TEXT,
    "series" TEXT,
    "currentPage" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'QUERO_LER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "genreName" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_genreName_fkey" FOREIGN KEY ("genreName") REFERENCES "Genre"("name") ON DELETE SET NULL ON UPDATE CASCADE;
