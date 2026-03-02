"use client"

import { tokenResentAccountConfirmationAction } from "@/backend/tokens/actions/token-resent-accouunt-confirmation.action";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TypographyH4, TypographyP } from "@/components/ui/typography";
import { BadgeCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ResendEmailVerificationAlertDialog() {
  const [open, setOpen] = useState(false);

  async function resentEmailVerification() {
    await tokenResentAccountConfirmationAction();
  }

  useEffect(() => {
    if (open) {
      resentEmailVerification();
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button type="button" className="text-primary font-semibold underline-offset-4 hover:underline cursor-pointer">
          clique aqui para reenviar o email.
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle className="sr-only"></AlertDialogTitle>
        <div className="w-full flex justify-center relative">
          <div className="absolute -right-4 -top-4">
            <button type="button" onClick={() => setOpen(false)}>
              <X className="size-4 text-black hover:text-foreground transition-colors cursor-pointer" />
            </button>
          </div>
          <div className="relative flex flex-col  rounded-full">
            <div className="flex items-center  gap-2">
              <BadgeCheck className="size-10 text-white fill-primary" />
              <TypographyH4 className="text-gray-800">E-mail reenviado!</TypographyH4>
            </div>
            <TypographyP className="text-muted-foreground ">
              O e-mail de verificação foi reenviado com sucesso. Verifique sua caixa de entrada.
            </TypographyP>
          </div>


        </div>


      </AlertDialogContent>
    </AlertDialog>
  )
}