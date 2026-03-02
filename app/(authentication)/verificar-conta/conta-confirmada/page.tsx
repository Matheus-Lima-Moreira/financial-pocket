import { confirmAccountAction } from "@/backend/autentication/actions/confirm-account.action";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { tokenValidateAction } from "@/backend/tokens/actions/token-validate.action";
import { InvalidTokenCard } from "@/components/invalid-token-card";
import { Metadata } from "next";
import { AccountConfirmedSuccess } from "./_components/account-confirmed-success";

export const metadata: Metadata = {
  title: "Conta confirmada",
};

type Props = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function AccountConfirmedPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <InvalidTokenCard
        title="Token não fornecido"
        message="O token de verificação não foi fornecido. Por favor, verifique o link enviado por email."
        returnLinkLabel="Voltar para o login"
        returnLinkHref="/login"
        variant="warning"
      />
    );
  }

  const response = await tokenValidateAction(token);

  if (!response.data || response.code !== StatusCode.SUCCESS) {
    return (
      <InvalidTokenCard
        title="Token inválido ou expirado"
        message="O token de verificação é inválido ou já expirou. Por favor, solicite um novo link de verificação."
        returnLinkLabel="Voltar para o login"
        returnLinkHref="/login"
        variant="error"
      />
    );
  }

  await confirmAccountAction(token);

  return <AccountConfirmedSuccess />;
}

