import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center text-center p-8 min-h-[60vh]">
      <h2 className="text-4xl font-bold">Página Não Encontrada</h2>
      <p className="text-muted-foreground mt-4">O recurso que você está procurando não existe.</p>
      <Button asChild className="mt-6">
        <Link href="/library">Voltar para a Biblioteca</Link>
      </Button>
    </div>
  )
}