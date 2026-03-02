import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 2px,
          hsl(var(--primary) / 0.1) 2px,
          hsl(var(--primary) / 0.1) 4px
        )`
      }}
    >
      <div className="flex flex-col items-center gap-8 max-w-2xl text-center">
        <div className="relative w-full max-w-md">
          <svg
            width="100%"
            height="200"
            viewBox="0 0 400 200"
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="diagonalLines"
                x="0"
                y="0"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(-45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="8"
                  y2="8"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
              </pattern>
            </defs>

            {/* Número 404 grande na cor primary */}
            <text
              x="200"
              y="140"
              fontSize="160"
              fontWeight="bold"
              fill="hsl(var(--primary))"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              404
            </text>

            {/* Camada de linhas diagonais sobre o número */}
            <rect
              x="20"
              y="20"
              width="360"
              height="160"
              fill="url(#diagonalLines)"
              opacity="0.6"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-foreground">Página não encontrada</h1>
          <p className="text-lg text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link href="/">
            <Button className="mt-4">
              Voltar para a página inicial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}