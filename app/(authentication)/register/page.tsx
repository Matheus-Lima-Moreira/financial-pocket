import { getSession } from "@/backend/session/helpers/get-session.helper";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { websiteConfig } from "@/lib/website.config";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RegisterForm } from "./_components/register-form";

export const metadata: Metadata = {
  title: "Cadastrar-se",
};

export default async function RegisterPage() {
  const hasSession = await getSession();

  if (hasSession) {
    return redirect("/dashboard");
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl relative z-10 mt-16 sm:mt-0 -mx-4 sm:mx-0">
        <Card className="p-0 pt-4 sm:pt-6">
          <CardHeader className="space-y-1 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <CardTitle className="text-xl sm:text-2xl text-gray-800 text-start font-bold">Cadastre-se na {websiteConfig.name}</CardTitle>
            <p className="text-base text-muted-foreground">
              Preencha os dados abaixo para criar sua conta.
            </p>
          </CardHeader>
          <CardContent className={cn(
            "flex flex-col px-4",
            "sm:px-6 md:px-8"
          )}>
            <RegisterForm />
          </CardContent>
          <CardFooter className={cn(
            "w-full bg-gray-50 gap-2 px-4 sm:px-6 md:px-8 py-4 flex justify-center border-t border-sidebar-border/50"
          )}>
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary font-semibold underline-offset-4 hover:underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

