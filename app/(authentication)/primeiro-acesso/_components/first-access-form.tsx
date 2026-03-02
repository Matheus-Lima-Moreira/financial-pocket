"use client";

import { firstAccessAction } from "@/backend/autentication/actions/first-access.action";
import { firstAccessSchema, FirstAccessSchema } from "@/backend/autentication/schemas/first-access.schema";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FirstAccessFormProps = {
  token: string;
}

export function FirstAccessForm({ token }: FirstAccessFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FirstAccessSchema>({
    resolver: zodResolver(firstAccessSchema),
    defaultValues: {
      token,
    },
  });

  const onSubmit = async (data: FirstAccessSchema) => {
    setError(null);
    const result = await firstAccessAction(data);

    if (result.code === StatusCode.SUCCESS) {
      return router.push("/primeiro-acesso/senha-definida");
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
        <FieldLabel htmlFor="password">
          Senha <span className="text-red-500">*</span>
        </FieldLabel>
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

      <Field>
        <FieldLabel htmlFor="confirmPassword">
          Confirmar Senha <span className="text-red-500">*</span>
        </FieldLabel>
        <FieldContent>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              maxLength={25}
              className="pr-10"
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <FieldError errors={errors.confirmPassword ? [errors.confirmPassword] : undefined} />
        </FieldContent>
      </Field>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Definindo senha..." : "Definir senha"}
      </Button>
    </form>
  );
}










