"use client"

import { loginAction } from "@/backend/autentication/actions/login.action";
import { loginSchema, LoginSchema } from "@/backend/autentication/schemas/login.schema";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setError(null);
    const result = await loginAction(data);

    if (result.code === StatusCode.SUCCESS) {
      return router.push("/dashboard");
    }

    setError(result.message || "Houve um erro interno no servidor.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {error && (
        <Alert variant="destructive">
          <AlertTitle className="flex items-center gap-2">
            <AlertCircle className="size-4" /> Atenção
          </AlertTitle>
          <AlertDescription>
            <p>{error}</p>
          </AlertDescription>
        </Alert>
      )}

      <Field>
        <FieldLabel htmlFor="email">
          E-mail <span className="text-red-500">*</span>
        </FieldLabel>
        <FieldContent>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          <FieldError errors={errors.email ? [errors.email] : undefined} />
        </FieldContent>
      </Field>

      <Field>
        <div className="w-full flex justify-between items-center mb-2">
          <FieldLabel htmlFor="password" className="mb-0">
            Senha <span className="text-red-500">*</span>
          </FieldLabel>
          <Link
            href="/forgot-password"
            className="text-sm text-primary font-semibold hover:text-primary underline-offset-4 hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <FieldContent>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              maxLength={25}
              className="pr-10"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <FieldError errors={errors.password ? [errors.password] : undefined} />
        </FieldContent>
      </Field>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}

