import { StatusCode } from "@/backend/shared/enum/status-code";
import { tokenValidateAction } from "@/backend/tokens/actions/token-validate.action";
import { InvalidTokenCard } from "@/components/invalid-token-card";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationIcon } from "@/components/verification-icon";
import { Metadata } from "next";
import { Key } from "lucide-react";
import Link from "next/link";
import { FirstAccessForm } from "./_components/first-access-form";

export const metadata: Metadata = {
  title: "Primeiro acesso",
};

type Props = {
  searchParams: Promise<{ token?: string }>;
}

export default async function FirstAccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return (
      <InvalidTokenCard
        title="Token não fornecido"
        message="O token de primeiro acesso não foi fornecido. Por favor, verifique o link enviado por email."
        returnLinkLabel="Voltar para o login"
        returnLinkHref="/login"
        variant="warning"
      />
    );
  }

  const response = await tokenValidateAction(token);

  if (!response.data || response.code !== StatusCode.SUCCESS) {
    return (
      <InvalidTokenCard
        title="Token inválido ou expirado"
        message="O token de primeiro acesso é inválido ou já expirou. Por favor, solicite um novo link de acesso."
        returnLinkLabel="Voltar para o login"
        returnLinkHref="/login"
        variant="error"
      />
    );
  }

  return (
    <div className="w-full max-w-2xl flex justify-center">
      <div className="w-full max-w-md relative md:mt-16">
        <Card className="p-0 pt-6 border-none shadow-md overflow-hidden">
          <VerificationIcon icon={Key} />
          <CardHeader className="space-y-1 px-8 pb-6 text-center">
            <CardTitle className="text-2xl text-gray-800 text-center font-bold">Primeiro acesso</CardTitle>
            <p className="text-base text-muted-foreground mt-2">
              Defina sua senha para acessar o sistema pela primeira vez.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col">
            <FirstAccessForm token={token} />
          </CardContent>
          <CardFooter className="w-full bg-gray-50 gap-2 px-8 py-4 flex justify-center border-t border-sidebar-border/50">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary font-semibold underline-offset-4 hover:underline">
                Fazer login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

