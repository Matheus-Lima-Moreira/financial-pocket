"use client";

import { registerAction } from "@/backend/autentication/actions/register.action";
import { registerSchema, RegisterSchema } from "@/backend/autentication/schemas/register.schema";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPhone } from "@/lib/masks";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const REGISTER_EMAIL_SENT_KEY = "register_email_sent";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
    watch,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setError(null);

    const result = await registerAction(data);

    if (result.code === StatusCode.SUCCESS) {
      router.replace("/register?sent=1");
      router.refresh();
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 w-full">
      <div className="space-y-4">
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
          <FieldLabel htmlFor="name" className="text-sm sm:text-base">
            Nome da Organização <span className="text-red-500">*</span>
          </FieldLabel>
          <FieldContent>
            <Input
              id="name"
              type="text"
              placeholder="Nome da sua organização"
              className="text-sm sm:text-base"
              {...register("organization.name")}
              aria-invalid={!!errors.organization?.name}
            />
            <FieldError errors={errors.organization?.name ? [errors.organization.name] : undefined} />
          </FieldContent>
        </Field>

      </div>

      {/* Dados Adicionais da Organização */}
      <div className="space-y-4">
        <Field>
          <FieldLabel htmlFor="cellphone" className="text-sm sm:text-base">Telefone Celular <span className="text-red-500">*</span></FieldLabel>
          <FieldContent>
            <Input
              id="cellphone"
              type="tel"
              placeholder="(11) 98765-4321"
              maxLength={15}
              value={formatPhone(watch("organization.cellphone") || "")}
              onChange={(e) => {
                const value = e.target.value;
                const numbersOnly = value.replace(/\D/g, "");
                setValue("organization.cellphone", numbersOnly.slice(0, 11), {
                  shouldValidate: true,
                });
              }}
              onBlur={(e) => {
                const value = e.target.value;
                const numbersOnly = value.replace(/\D/g, "");
                setValue("organization.cellphone", numbersOnly.slice(0, 11), {
                  shouldValidate: true,
                });
              }}
              aria-invalid={!!errors.organization?.cellphone}
            />
            <FieldError
              errors={errors.organization?.cellphone ? [errors.organization.cellphone] : undefined}
            />
          </FieldContent>
        </Field>
      </div>

      {/* Dados do Usuário */}
      <div className="space-y-4 pt-2">

        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="user.name" className="text-sm sm:text-base">Nome Completo <span className="text-red-500">*</span></FieldLabel>
            <FieldContent>
              <Input
                id="user.name"
                type="text"
                placeholder="Seu nome completo"
                {...register("user.name")}
                aria-invalid={!!errors.user?.name}
              />
              <FieldError
                errors={errors.user?.name ? [errors.user.name] : undefined}
              />
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="user.email" className="text-sm sm:text-base">Email <span className="text-red-500">*</span></FieldLabel>
          <FieldContent>
            <Input
              id="user.email"
              type="email"
              placeholder="seu@email.com"
              {...register("user.email")}
              aria-invalid={!!errors.user?.email}
            />
            <FieldError
              errors={errors.user?.email ? [errors.user.email] : undefined}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="user.password" className="text-sm sm:text-base">Senha <span className="text-red-500">*</span></FieldLabel>
          <FieldContent>
            <div className="relative">
              <Input
                id="user.password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
                maxLength={25}
                {...register("user.password")}
                aria-invalid={!!errors.user?.password}
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
            <FieldError
              errors={
                errors.user?.password ? [errors.user.password] : undefined
              }
            />
          </FieldContent>
        </Field>
      </div>

      <Field orientation="horizontal">
        <FieldContent>
          <div className="flex items-center gap-2 sm:gap-3">
            <Controller
              name="acceptTerms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="acceptTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={!!errors.acceptTerms}
                />
              )}
            />
            <Label htmlFor="acceptTerms" className="text-xs sm:text-sm font-normal cursor-pointer leading-relaxed">
              Eu li e aceito os{" "}
              <Link
                href="/termos-de-uso"
                className="text-primary font-semibold underline-offset-4 hover:underline"
                target="_blank"
              >
                termos de uso
              </Link>
              {" "}e a{" "}
              <Link
                href="/politica-de-privacidade"
                className="text-primary font-semibold underline-offset-4 hover:underline"
                target="_blank"
              >
                política de privacidade
              </Link>
            </Label>
          </div>
          <FieldError
            errors={errors.acceptTerms ? [errors.acceptTerms] : undefined}
          />
        </FieldContent>
      </Field>

      <Button type="submit" className="w-full text-sm sm:text-base" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}

