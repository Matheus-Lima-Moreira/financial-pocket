"use client";

import { forgotPasswordAction } from "@/backend/autentication/actions/forgot-password.action";
import { sessionChangePasswordAction } from "@/backend/session/actions/session-change-password.action";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { UserProfileDto } from "@/backend/user/dtos/user-profile-reply.dto";
import { UserChangePasswordSchema, userChangePasswordSchema } from "@/backend/user/schemas/user-change-password.schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { showSnackbarToast } from "@/components/ui/snackbar-toast";
import { TypographyH4, TypographyP } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon, BadgeCheck, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ProfileChangePasswordFormProps = {
  profile: UserProfileDto;
}

export default function ProfileChangePasswordForm({ profile }: ProfileChangePasswordFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotPasswordSuccessDialogOpen, setForgotPasswordSuccessDialogOpen] = useState(false);
  const [isSendingForgotPassword, setIsSendingForgotPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserChangePasswordSchema>({
    resolver: zodResolver(userChangePasswordSchema),
  });

  async function onSubmit(data: UserChangePasswordSchema) {
    setError(null);

    const result = await sessionChangePasswordAction(data);

    if (result.code !== StatusCode.SUCCESS) {
      setError(result.message || "Erro ao alterar senha");
      return;
    }

    showSnackbarToast({
      message: "Senha alterada com sucesso!",
      position: "top-center",
      duration: 3000,
    });

    reset();
  }

  async function handleForgotPassword() {
    setIsSendingForgotPassword(true);

    try {
      const result = await forgotPasswordAction({
        email: profile.email,
      });

      if (result.code === StatusCode.SUCCESS) {
        setForgotPasswordSuccessDialogOpen(true);
      } else {
        showSnackbarToast({
          message: result.message || "Erro ao enviar link de recuperação",
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      showSnackbarToast({
        message: "Erro ao enviar link de recuperação",
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsSendingForgotPassword(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 max-w-md">
          {error && (
            <Alert variant="destructive" className="items-center p-2">
              <AlertTriangleIcon />
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription className="text-muted">
                <p className="text-muted-foreground">{error}</p>
              </AlertDescription>
            </Alert>
          )}

          <Field className="gap-2">
            <div className="flex items-center justify-between w-full">
              <FieldLabel htmlFor="currentPassword">Senha Atual <span className="text-red-500">*</span></FieldLabel>
              <Button
                type="button"
                variant="link"
                onClick={handleForgotPassword}
                disabled={isSendingForgotPassword}
                className="h-auto p-0 text-sm"
              >
                {isSendingForgotPassword ? "Enviando..." : "Esqueceu a senha?"}
              </Button>
            </div>
            <FieldContent>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                  {...register("currentPassword")}
                  aria-invalid={!!errors.currentPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showCurrentPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <FieldError
                errors={errors.currentPassword ? [errors.currentPassword] : undefined}
              />
            </FieldContent>
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="newPassword">Nova Senha <span className="text-red-500">*</span></FieldLabel>
            <FieldContent>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                  {...register("newPassword")}
                  aria-invalid={!!errors.newPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showNewPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <FieldError
                errors={errors.newPassword ? [errors.newPassword] : undefined}
              />
            </FieldContent>
            <small className="text-muted-foreground text-xs">
              A senha deve conter pelo menos 6 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.
            </small>
          </Field>

          <hr className="border-dashed border-zinc-300" />
          <div className="flex items-center justify-end gap-2 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </div>
      </form>

      <AlertDialog open={forgotPasswordSuccessDialogOpen} onOpenChange={setForgotPasswordSuccessDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle className="sr-only"></AlertDialogTitle>
          <div className="w-full flex justify-center relative">
            <div className="absolute -right-4 -top-4">
              <button type="button" onClick={() => setForgotPasswordSuccessDialogOpen(false)}>
                <X className="size-4 text-black hover:text-foreground transition-colors cursor-pointer" />
              </button>
            </div>
            <div className="relative flex flex-col rounded-full">
              <div className="flex items-center gap-2">
                <BadgeCheck className="size-10 text-white fill-primary" />
                <TypographyH4 className="text-gray-800">Link enviado!</TypographyH4>
              </div>
              <TypographyP className="text-muted-foreground">
                O link de recuperação de senha foi enviado com sucesso. Verifique sua caixa de entrada.
              </TypographyP>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

