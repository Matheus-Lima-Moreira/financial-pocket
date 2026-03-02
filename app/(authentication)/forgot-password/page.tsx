import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { VerificationIcon } from "@/components/verification-icon"
import { Metadata } from "next"
import { Lock } from "lucide-react"
import Link from "next/link"
import { ForgotPasswordForm } from "./_components/forgot-password-form"

export const metadata: Metadata = {
  title: "Esqueceu a senha",
};

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-2xl flex justify-center">
      <div className="w-full max-w-md relative md:mt-16">
        <Card className="p-0 pt-6 border-none shadow-md overflow-hidden">
          <VerificationIcon icon={Lock} />
          <CardHeader className="space-y-1 px-8 pb-6 text-center">
            <CardTitle className="text-2xl text-gray-800 text-center font-bold">Esqueceu sua senha?</CardTitle>
            <p className="text-base text-muted-foreground mt-2">
              Digite seu email e enviaremos um link para redefinir sua senha.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col">
            <ForgotPasswordForm />
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

