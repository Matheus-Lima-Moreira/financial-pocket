import { getSession } from "@/backend/session/helpers/get-session.helper";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { websiteConfig } from "@/lib/website.config";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const hasSession = await getSession();

  if (hasSession) {
    return redirect("/dashboard");
  }

  return (
    <div className="w-full max-w-2xl flex justify-center">
      <div className="w-full max-w-md relative md:mt-16">
        <Card className="p-0 pt-6 border-none shadow-md">
          <CardHeader className="space-y-1 px-8 py-6">
            <CardTitle className="text-2xl text-gray-800 text-start font-bold">Acesse ou crie sua conta</CardTitle>
            <p className="text-base text-muted-foreground mt-2">
              Digite as suas credenciais para acessar o sistema.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col">
            <LoginForm />
          </CardContent>
          <CardFooter className="w-full bg-gray-50 gap-2 px-8 py-4 flex justify-center border-t border-sidebar-border/50">
            <p className="text-sm text-muted-foreground">
              Novo na {websiteConfig.name}?{" "}
              <Link href="/register" className="text-primary font-semibold underline-offset-4 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}