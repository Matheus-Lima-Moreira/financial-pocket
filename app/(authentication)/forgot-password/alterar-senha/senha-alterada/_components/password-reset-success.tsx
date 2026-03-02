import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationIcon } from "@/components/verification-icon";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

export function PasswordResetSuccess() {
  return (
    <div className="w-full max-w-2xl flex justify-center">
      <div className="w-full max-w-md relative md:mt-16">
        <Card className="p-0 pt-6 border-none shadow-md overflow-hidden">
          <VerificationIcon icon={BadgeCheck} />
          <CardHeader className="space-y-1 px-8 pb-6 text-center">
            <CardTitle className="text-2xl text-gray-800 text-center font-bold">
              Senha alterada com sucesso!
            </CardTitle>
            <p className="text-base text-muted-foreground mt-2">
              Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.
            </p>
          </CardHeader>
          <CardFooter className="w-full bg-gray-50 gap-2 px-8 py-4 flex justify-center border-t border-sidebar-border/50">
            <p className="text-sm text-muted-foreground">
              Pronto para fazer login?{" "}
              <Link href="/login" className="text-primary font-semibold underline-offset-4 hover:underline">
                Voltar para o login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

