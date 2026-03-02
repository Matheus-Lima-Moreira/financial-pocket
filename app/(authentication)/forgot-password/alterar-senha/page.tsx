import { StatusCode } from "@/backend/shared/enum/status-code";
import { tokenValidateAction } from "@/backend/tokens/actions/token-validate.action";
import { InvalidTokenCard } from "@/components/invalid-token-card";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationIcon } from "@/components/verification-icon";
import { Metadata } from "next";
import { Lock } from "lucide-react";
import Link from "next/link";
import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata: Metadata = {
  title: "Alterar senha",
};

type Props = {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return (
      <InvalidTokenCard
        title="Token não fornecido"
        message="O token de redefinição de senha não foi fornecido. Por favor, verifique o link enviado por email."
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
        message="O token de redefinição de senha é inválido ou já expirou. Por favor, solicite um novo link de redefinição."
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
          <VerificationIcon icon={Lock} />
          <CardHeader className="space-y-1 px-8 pb-6 text-center">
            <CardTitle className="text-2xl text-gray-800 text-center font-bold">Alterar senha</CardTitle>
            <p className="text-base text-muted-foreground mt-2">
              Digite sua nova senha abaixo para redefinir sua senha.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col">
            <ResetPasswordForm token={token} />
          </CardContent>
          <CardFooter className="w-full bg-gray-50 gap-2 px-8 py-4 flex justify-center border-t border-sidebar-border/50">
            <p className="text-sm text-muted-foreground">
              Lembrou sua senha?{" "}
              <Link href="/login" className="text-primary font-semibold underline-offset-4 hover:underline">
                Voltar ao login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

