"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Quem Somos" },
    { href: "/pricing", label: "Planos" },
    { href: "/faqs", label: "FAQ" },
    { href: "/support", label: "Suporte" },
  ];

  return (
    <header className="w-full flex justify-center border-b border-zinc-300 dark:border-zinc-800 bg-white">
      <div className="w-full max-w-7xl flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex text-xs sm:text-sm">
            <Link href="/register">Teste grátis por 14 dias</Link>
          </Button>

          {/* Menu mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="pb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800 px-1">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-10"
                  >
                    <Link href="/login" onClick={() => setOpen(false)}>Entrar</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="w-full h-10"
                  >
                    <Link href="/cadastrar-se" onClick={() => setOpen(false)}>Teste grátis por 14 dias</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
