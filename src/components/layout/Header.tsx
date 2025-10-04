import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          Book<span className="text-foreground">Shelf</span>
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/library"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Minha Biblioteca
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}