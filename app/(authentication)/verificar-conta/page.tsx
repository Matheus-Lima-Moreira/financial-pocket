import { getSession } from "@/backend/session/helpers/get-session.helper";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationIcon } from "@/components/verification-icon";
import { Metadata } from "next";
import { Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { ResendEmailVerificationAlertDialog } from "./_components/resend-email-verification-alert-dialog";

export const metadata: Metadata = {
  title: "Verificar conta",
};

export default async function VerifyAccountPage() {
  const hasSession = await getSession();
  if (!hasSession) {
    return notFound();
  }

  return (
    <div className="w-full max-w-2xl flex justify-center">
      <div className="w-full max-w-md relative md:mt-16">
        <Card className="p-0 pt-6 border-none shadow-md overflow-hidden">
          <VerificationIcon icon={Mail} />
          <CardHeader className="space-y-1 px-8 pb-6 text-center">
            <CardTitle className="text-2xl text-gray-800 text-center font-bold">Verifique sua conta</CardTitle>
            <p className="text-base text-muted-foreground mt-2">
              Enviamos um link de verificação para o seu email. Acesse sua caixa de entrada e clique no link para verificar sua conta.
            </p>
          </CardHeader>
          <CardFooter className="w-full bg-gray-50 gap-2 px-8 py-4 flex justify-center border-t border-sidebar-border/50">
            <p className="text-sm text-muted-foreground">
              Não recebeu o email? Verifique sua pasta de spam ou{" "}
              <ResendEmailVerificationAlertDialog />
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

