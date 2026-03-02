"use client";

import { permissionGroupCreateAction } from "@/backend/group-permission/actions/permission-group-create.action";
import { GroupPermissionSchema, groupPermissionSchema } from "@/backend/group-permission/schemas/group-permission.schema";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/ui/error-alert";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { showSnackbarToast } from "@/components/ui/snackbar-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function GroupPermissionCreateForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GroupPermissionSchema>({
    resolver: zodResolver(groupPermissionSchema),
  });


  async function onSubmit(data: GroupPermissionSchema) {
    showSnackbarToast({
      message: "Cadastrando grupo de permissões...",
      position: "top-center",
      duration: 1500,
    });

    const result = await permissionGroupCreateAction(data);

    if (result.code != StatusCode.SUCCESS) {
      return setError(result.message || "Erro ao cadastrar grupo de permissões");
    }

    return router.push("/dashboard/grupos-de-permissoes/editar?id=" + result.data.id);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {error && (
          <ErrorAlert
            message={error}
            onDismiss={() => setError(null)}
            autoDismiss={true}
            dismissAfter={5000}
          />
        )}
        <hr className="border-dashed border-zinc-300" />
        <div className="grid gap-4 md:grid-cols-[30%_auto]">
          <div className="flex flex-col px-4">
            <FieldLabel htmlFor="name">Nome <span className="text-red-500">*</span></FieldLabel>
            <small className="text-muted-foreground text-xs">
              Informe o nome do grupo de permissão.
            </small>
          </div>
          <div className="flex flex-col px-4 md:pe-4">
            <Input id="name" type="text" className="border border-zinc-300" placeholder="Ex: Financeiro"  {...register("name")} />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </div>
        </div>
        <hr className="border-dashed border-zinc-300" />
      </FieldGroup>
      <div className="w-full flex justify-end gap-4 mt-4 px-4">
        <Link href="/dashboard/grupos-de-permissoes">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </Link>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </div>
    </form>
  )
}