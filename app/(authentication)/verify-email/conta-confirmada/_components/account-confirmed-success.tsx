import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationIcon } from "@/components/verification-icon";
import { websiteConfig } from "@/lib/website.config";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

export function AccountConfirmedSuccess() {
  return (
    <div className="w-full max-w-2xl flex justify-center">
      <div className="w-full max-w-md relative md:mt-16">
        <Card className="p-0 pt-6 border-none shadow-md overflow-hidden">
          <VerificationIcon icon={BadgeCheck} />
          <CardHeader className="space-y-1 px-8 pb-6 text-center">
            <CardTitle className="text-2xl text-gray-800 text-center font-bold">
              Conta confirmada com sucesso!
            </CardTitle>
            <p className="text-base text-muted-foreground mt-2">
              Bem-vindo à {websiteConfig.name}! Sua conta foi verificada e está pronta para uso.
            </p>
          </CardHeader>
          <CardFooter className="w-full bg-gray-50 gap-2 px-8 py-4 flex justify-center border-t border-sidebar-border/50">
            <p className="text-sm text-muted-foreground">
              Pronto para começar?{" "}
              <Link href="/dashboard" className="text-primary font-semibold underline-offset-4 hover:underline">
                Acessar dashboard
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}




