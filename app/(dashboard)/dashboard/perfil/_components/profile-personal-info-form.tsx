"use client";

import { StatusCode } from "@/backend/shared/enum/status-code";
import { userUpdateAction } from "@/backend/user/actions/user-update.action";
import { UserProfileDto } from "@/backend/user/dtos/user-profile-reply.dto";
import { UserEditSchema, userEditSchema } from "@/backend/user/schemas/user-edit.schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { showSnackbarToast } from "@/components/ui/snackbar-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ProfileAvatarUpload from "./profile-avatar-upload";
import { useProfileContext } from "./profile-content";

type ProfilePersonalInfoFormProps = {
  profile: UserProfileDto;
  isEditing: boolean;
  onSave: () => void;
}

export default function ProfilePersonalInfoForm({ profile, isEditing, onSave }: ProfilePersonalInfoFormProps) {
  const router = useRouter();
  const { setIsEditing } = useProfileContext();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserEditSchema>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      position: profile.position,
    },
  });

  async function onSubmit(data: UserEditSchema) {
    setError(null);

    const result = await userUpdateAction(profile.id, data);

    if (result.code !== StatusCode.SUCCESS) {
      setError(result.message || "Erro ao atualizar perfil");
      return;
    }

    showSnackbarToast({
      message: "Perfil atualizado com sucesso!",
      position: "top-center",
      duration: 3000,
    });

    onSave();
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {error && (
          <Alert variant="destructive" className="items-center p-2">
            <AlertTriangleIcon />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription className="text-muted">
              <p className="text-muted-foreground">{error}</p>
            </AlertDescription>
          </Alert>
        )}

        <ProfileAvatarUpload profile={profile} />

        <hr className="border-dashed border-zinc-300" />

        <div className="flex flex-col gap-4">
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name">Nome <span className="text-red-500">*</span></FieldLabel>
              {!isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="h-9"
                >
                  <Pencil className="size-4" />
                  <span>Editar</span>
                </Button>
              )}
            </div>
            <FieldContent>
              <Input
                id="name"
                type="text"
                placeholder="Ex: João Silva"
                disabled={!isEditing}
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              <FieldError
                errors={errors.name ? [errors.name] : undefined}
              />
            </FieldContent>
            <small className="text-muted-foreground text-xs">
              Informe o nome completo.
            </small>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">E-mail <span className="text-red-500">*</span></FieldLabel>
            <FieldContent>
              <Input
                id="email"
                type="email"
                disabled
                placeholder="Ex: joao.silva@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              <FieldError
                errors={errors.email ? [errors.email] : undefined}
              />
            </FieldContent>
            <small className="text-muted-foreground text-xs">
              O e-mail não pode ser alterado.
            </small>
          </Field>

          <Field>
            <FieldLabel htmlFor="position">Cargo <span className="text-red-500">*</span></FieldLabel>
            <FieldContent>
              <Input
                id="position"
                type="text"
                placeholder="Ex: Desenvolvedor"
                disabled={!isEditing}
                {...register("position")}
                aria-invalid={!!errors.position}
              />
              <FieldError
                errors={errors.position ? [errors.position] : undefined}
              />
            </FieldContent>
            <small className="text-muted-foreground text-xs">
              Informe o cargo na organização.
            </small>
          </Field>
        </div>
        {isEditing && (
          <>
            <hr className="border-dashed border-zinc-300" />
            <div className="flex items-center justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}

