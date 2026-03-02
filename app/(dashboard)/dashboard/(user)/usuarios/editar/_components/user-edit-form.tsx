"use client";

import { GroupPermissionDto } from "@/backend/group-permission/dtos/group-permission.dto";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { userUpdateAction } from "@/backend/user/actions/user-update.action";
import { UserReplyDto } from "@/backend/user/dtos/user-reply.dto";
import { UserEditSchema, userEditSchema } from "@/backend/user/schemas/user-edit.schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { showSnackbarToast } from "@/components/ui/snackbar-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UserAvatarUpload from "./user-avatar-upload";
import UserGroupPermissionTab from "./user-group-permission-tab";

type UserEditFormProps = {
  user: UserReplyDto;
  groupPermissions: GroupPermissionDto[];
}

export default function UserEditForm({ user, groupPermissions }: UserEditFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserEditSchema>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      position: user.position,
    },
  });

  async function onSubmit(data: UserEditSchema) {
    setError(null);

    showSnackbarToast({
      message: "Atualizando usuário...",
      position: "top-center",
      duration: 1500,
    });

    const result = await userUpdateAction(user.id, data);

    if (result.code != StatusCode.SUCCESS) {
      setError(result.message || "Erro ao atualizar usuário");
      return;
    }

    showSnackbarToast({
      message: "Usuário atualizado com sucesso!",
      position: "top-center",
      duration: 3000,
    });

    router.refresh();
  }

  return (
    <div className="px-0 pb-4">
      <Tabs defaultValue="dados" className="w-full">
        <div className="w-full bg-gray-50 border-y border-zinc-300">
          <TabsList variant="line">
            <TabsTrigger className="cursor-pointer" value="dados">Dados</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="grupo-permissoes">Grupo de Permissões</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dados" className="px-4 pt-4">
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

              <UserAvatarUpload user={user} />

              <hr className="border-dashed border-zinc-300" />

              <div className="flex flex-col gap-4">
                <Field>
                  <FieldLabel htmlFor="name">Nome <span className="text-red-500">*</span></FieldLabel>
                  <FieldContent>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ex: João Silva"
                      {...register("name")}
                      aria-invalid={!!errors.name}
                    />
                    <FieldError
                      errors={errors.name ? [errors.name] : undefined}
                    />
                  </FieldContent>
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
                </Field>

                <Field>
                  <FieldLabel htmlFor="position">Cargo <span className="text-red-500">*</span></FieldLabel>
                  <FieldContent>
                    <Input
                      id="position"
                      type="text"
                      placeholder="Ex: Desenvolvedor"
                      {...register("position")}
                      aria-invalid={!!errors.position}
                    />
                    <FieldError
                      errors={errors.position ? [errors.position] : undefined}
                    />
                  </FieldContent>
                </Field>
              </div>
              <hr className="border-dashed border-zinc-300" />
              <div className="flex items-center justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar alterações"}
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="grupo-permissoes">
          <UserGroupPermissionTab
            userId={user.id}
            currentGroupPermissionId={""}
            groupPermissions={groupPermissions}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

