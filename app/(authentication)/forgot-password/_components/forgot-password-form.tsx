"use client"

import { forgotPasswordAction } from "@/backend/autentication/actions/forgot-password.action";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/backend/autentication/schemas/forgot-password.schema";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ForgotPasswordSendAlertDialog } from "./forgot-password-send-alert-dialog";

export function ForgotPasswordForm() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    const result = await forgotPasswordAction(data);

    if (result.code === StatusCode.SUCCESS) {
      setDialogOpen(true);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail <span className="text-red-500">*</span></Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
        </Button>
      </form>
      <ForgotPasswordSendAlertDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}

