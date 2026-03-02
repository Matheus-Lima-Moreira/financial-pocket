

"use client";

import { ActionGroupDto } from "@/backend/actions/dtos/action-group-reply.dto";
import { permissionGroupActionCreateAction } from "@/backend/group-permission/actions/group-permission-action-create.action";
import { permissionGroupActionRemoveAction } from "@/backend/group-permission/actions/group-permission-action-remove.action";
import { permissionGroupUpdateAction } from "@/backend/group-permission/actions/permission-group-update.action";
import { GroupPermissionDetailDto } from "@/backend/group-permission/dtos/group-permission-detail.dto";
import { GroupPermissionSchema, groupPermissionSchema } from "@/backend/group-permission/schemas/group-permission.schema";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSnackbarToast } from "@/components/ui/snackbar-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon, ChevronRight, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type GroupPermissionEditFormProps = {
  actions: ActionGroupDto[];
  groupPermission: GroupPermissionDetailDto;
}


export default function GroupPermissionEditForm({ actions, groupPermission }: GroupPermissionEditFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(groupPermission.name);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<GroupPermissionSchema>({
    resolver: zodResolver(groupPermissionSchema),
    defaultValues: {
      name: groupPermission.name,
    },
  });

  const currentName = watch("name");

  useEffect(() => {
    // Inicializa as ações já vinculadas
    const linkedActionIds: string[] = [];
    groupPermission.actions.forEach((group) => {
      group.actions.forEach((action) => {
        linkedActionIds.push(action.id);
      });
    });
    setSelectedActions(linkedActionIds);
  }, [groupPermission.actions]);

  async function onSaveName() {
    // TODO: Implementar atualização do nome
    console.log("Salvar nome:", currentName);
    setIsEditingName(false);
  }

  function onCancelNameEdit() {
    setValue("name", nameValue);
    setIsEditingName(false);
  }

  function onStartEditName() {
    setNameValue(currentName);
    setIsEditingName(true);
  }

  async function handleActionToggle(actionId: string, checked: boolean) {
    try {
      if (checked) {
        const result = await permissionGroupActionCreateAction(groupPermission.id, actionId);
        if (result.code != StatusCode.SUCCESS) {
          setError(result.message || "Erro ao vincular ação");
          return;
        }
        setSelectedActions((prev) => [...prev, actionId]);
        showSnackbarToast({
          message: "Ação associada com sucesso!",
          position: "top-center",
          duration: 3000,
        });
      } else {
        const result = await permissionGroupActionRemoveAction(groupPermission.id, actionId);
        if (result.code != StatusCode.SUCCESS) {
          setError(result.message || "Erro ao desvincular ação");
          return;
        }
        setSelectedActions((prev) => prev.filter((id) => id !== actionId));
        showSnackbarToast({
          message: "Ação desassociada com sucesso!",
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      setError("Erro ao processar ação");
    }
  }

  async function onSubmit(data: GroupPermissionSchema) {
    showSnackbarToast({
      message: "Atualizando grupo de permissões...",
      position: "top-center",
      duration: 1500,
    });

    const result = await permissionGroupUpdateAction(groupPermission.id, data);

    if (result.code != StatusCode.SUCCESS) {
      return setError(result.message || "Erro ao atualizar grupo de permissões");
    }

    showSnackbarToast({
      message: "Grupo de permissões atualizado com sucesso!",
      position: "top-center",
      duration: 3000,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4">
      <FieldGroup>
        {error && <Alert className="items-center p-2" variant="destructive">
          <AlertTriangleIcon />
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription className="text-muted">
            <p className="text-muted-foreground">{error}</p>
          </AlertDescription>
        </Alert>}
        <hr className="border-dashed border-zinc-300" />
        <div className="grid gap-4 md:grid-cols-[15%_auto]">
          <div className="flex flex-col">
            <FieldLabel htmlFor="name">Nome <span className="text-red-500">*</span></FieldLabel>
            <small className="text-muted-foreground text-xs">
              Informe o nome do grupo de permissão.
            </small>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Input
                id="name"
                type="text"
                className="border border-zinc-300 flex-1"
                placeholder="Ex: Financeiro"
                {...register("name")}
                disabled={!isEditingName}
              />
              {!isEditingName && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
                  onClick={onStartEditName}
                  aria-label="Editar nome"
                >
                  <Pencil className="size-4" />
                </Button>
              )}
            </div>
            {isEditingName && (
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onCancelNameEdit}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={onSaveName}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            )}
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold">Ações</h3>
            <hr className="flex-1 border-dashed border-zinc-300" />
          </div>
          <small className="text-muted-foreground text-xs">
            Agora informe as ações do grupo de permissão.
          </small>
        </div>

        <div className="flex flex-col gap-4">
          {actions.map((actGroup) => {
            const selectedCount = actGroup.actions.filter((action) =>
              selectedActions.includes(action.id)
            ).length;

            return (
              <Collapsible
                key={actGroup.resource}
                defaultOpen={true}
                className="group/collapsible bg-zinc-50 border border-zinc-300 rounded-md overflow-hidden"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-accent/50 transition-colors border-b border-zinc-200">
                  <div className="flex items-center gap-2">
                    <span>{actGroup.label}</span>
                    {selectedCount > 0 && (
                      <span className="text-xs font-normal text-muted-foreground">
                        ({selectedCount}/{actGroup.actions.length})
                      </span>
                    )}
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down bg-background">
                  <div className="flex flex-col p-3 gap-1">
                    {actGroup.actions.map((action, index) => {
                      const isChecked = selectedActions.includes(action.id);
                      return (
                        <div key={action.id}>
                          <div className={`flex items-start gap-3 px-2 py-3 rounded-md transition-colors ${isChecked
                            ? "bg-muted/50"
                            : "bg-background hover:bg-muted/30"
                            }`}>
                            <div className="pt-0.5">
                              <Checkbox
                                id={action.id}
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  handleActionToggle(action.id, checked as boolean);
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                              <Label
                                htmlFor={action.id}
                                className="text-sm font-medium cursor-pointer select-none"
                              >
                                {action.label}
                              </Label>
                              {action.description && (
                                <small className="text-xs text-muted-foreground">
                                  {action.description}
                                </small>
                              )}
                            </div>
                          </div>
                          {index < actGroup.actions.length - 1 && (
                            <hr className="border-zinc-200 my-1" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </FieldGroup>
    </form>
  )
}