import { Book } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
        <Avatar className="h-24 w-24 rounded-md">
          <AvatarImage src={book.coverUrl} alt={book.title} />
          <AvatarFallback className="rounded-md bg-muted text-sm text-muted-foreground">
            Sem Capa
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="mb-1 text-lg leading-tight">{book.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {book.publicationYear}
          </p>
          {book.rating && <StarRating rating={book.rating} className="mt-2" />}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Visualizar</DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {book.synopsis}
        </p>
      </CardContent>
      <CardFooter>
        {book.genre && <Badge variant="outline">{book.genre}</Badge>}
      </CardFooter>
    </Card>
  );
}