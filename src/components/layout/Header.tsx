"use client";

import Link from "next/link";
import { BookOpen, Home, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/library", label: "Biblioteca", icon: BookOpen },
    { href: "/genres", label: "Gêneros", icon: LayoutGrid },
  ];

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Book<span className="text-primary">Shelf</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}