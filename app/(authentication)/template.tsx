import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export default function AuthenticationTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-sidebar">
      <div className="w-full flex justify-start border-b border-sidebar-border p-2">
        <div className="w-full lg:px-52">
          <Logo />
        </div>
      </div>
      <div className="w-full flex-1 lg:px-52 relative flex flex-col min-h-0">
        <div
          className={cn(
            "w-full min-h-full flex flex-1 justify-center items-center",
            "border-x border-sidebar-border/50 p-4",
            "lg:p-10"
          )}
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.05) 2px,
              rgba(0, 0, 0, 0.05) 4px
            )`
          }}
        >
          {children}
        </div>
      </div>
      <div className={cn(
        "w-full h-12",
        "flex justify-center items-center",
        "px-1 border-t border-sidebar-border",
        "lg:justify-start"
      )}>
        <div className={cn(
          "w-full flex flex-wrap justify-center",
          "gap-x-4 gap-y-2 text-sm text-muted-foreground",
          "lg:justify-start lg:px-52"
        )}>
          <a
            href="/termos-de-uso"
            className="hover:text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Termos de Uso
          </a>
          <span className="mx-2 text-gray-400">|</span>
          <a
            href="/politica-de-privacidade"
            className="hover:text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
}