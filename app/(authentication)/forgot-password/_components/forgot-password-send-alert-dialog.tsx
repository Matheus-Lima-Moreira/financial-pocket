"use client"

import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { TypographyH4, TypographyP } from "@/components/ui/typography";
import { BadgeCheck, X } from "lucide-react";

type ForgotPasswordSendAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordSendAlertDialog({ open, onOpenChange }: ForgotPasswordSendAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle className="sr-only"></AlertDialogTitle>
        <div className="w-full flex justify-center relative">
          <div className="absolute -right-4 -top-4">
            <button type="button" onClick={() => onOpenChange(false)}>
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
  )
}

