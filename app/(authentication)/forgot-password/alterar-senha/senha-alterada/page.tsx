import { Metadata } from "next";
import { PasswordResetSuccess } from "./_components/password-reset-success";

export const metadata: Metadata = {
  title: "Senha alterada",
};

export default function PasswordResetSuccessPage() {
  return <PasswordResetSuccess />;
}

