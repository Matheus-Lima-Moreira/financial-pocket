"use client";

import { GroupPermissionDto } from "@/backend/group-permission/dtos/group-permission.dto";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { userGroupPermissionAssociateAction } from "@/backend/user/actions/group-permission/user-group-permission-associate.action";
import { userGroupPermissionReadAllAction } from "@/backend/user/actions/group-permission/user-group-permission-read-all.action";
import { userGroupPermissionUnassociateAction } from "@/backend/user/actions/group-permission/user-group-permission-unassociate.action";
import { EmptyState } from "@/components/empty";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { showSnackbarToast } from "@/components/ui/snackbar-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type UserGroupPermissionTabProps = {
  userId: string;
  currentGroupPermissionId?: string;
  groupPermissions: GroupPermissionDto[];
}

export default function UserGroupPermissionTab({
  userId,
  groupPermissions,
}: UserGroupPermissionTabProps) {
  const [selectedGroupPermissionId, setSelectedGroupPermissionId] = useState<string>("");
  const [userGroupPermissions, setUserGroupPermissions] = useState<GroupPermissionDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAssociating, setIsAssociating] = useState(false);
  const [isUnassociating, setIsUnassociating] = useState<string | null>(null);

  useEffect(() => {
    loadUserGroupPermissions();
  }, [userId]);

  async function loadUserGroupPermissions() {
    setIsLoading(true);
    try {
      const result = await userGroupPermissionReadAllAction(userId);
      if (result.code === StatusCode.SUCCESS) {
        setUserGroupPermissions(result.data || []);
      }
    } catch (error) {
      showSnackbarToast({
        message: "Erro ao carregar grupos de permissões",
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAssociate() {
    if (!selectedGroupPermissionId) {
      showSnackbarToast({
        message: "Selecione um grupo de permissões",
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Verificar se já está associado
    if (userGroupPermissions.some(gp => gp.id === selectedGroupPermissionId)) {
      showSnackbarToast({
        message: "Este grupo de permissões já está associado ao usuário",
        position: "top-center",
        duration: 3000,
      });
      setSelectedGroupPermissionId("");
      return;
    }

    setIsAssociating(true);

    try {
      const result = await userGroupPermissionAssociateAction(userId, {
        groupPermissionId: selectedGroupPermissionId,
      });

      if (result.code !== StatusCode.SUCCESS) {
        showSnackbarToast({
          message: result.message || "Erro ao associar grupo de permissões",
          position: "top-center",
          duration: 3000,
        });
        return;
      }

      showSnackbarToast({
        message: "Grupo de permissões associado com sucesso!",
        position: "top-center",
        duration: 3000,
      });

      setSelectedGroupPermissionId("");
      await loadUserGroupPermissions();
    } catch (error) {
      showSnackbarToast({
        message: "Erro ao associar grupo de permissões",
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsAssociating(false);
    }
  }

  async function handleUnassociate(groupPermissionId: string) {
    setIsUnassociating(groupPermissionId);

    try {
      const result = await userGroupPermissionUnassociateAction(userId, groupPermissionId);

      if (result.code !== StatusCode.SUCCESS) {
        showSnackbarToast({
          message: result.message || "Erro ao desassociar grupo de permissões",
          position: "top-center",
          duration: 3000,
        });
        return;
      }

      showSnackbarToast({
        message: "Grupo de permissões desassociado com sucesso!",
        position: "top-center",
        duration: 3000,
      });

      await loadUserGroupPermissions();
    } catch (error) {
      showSnackbarToast({
        message: "Erro ao desassociar grupo de permissões",
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsUnassociating(null);
    }
  }

  const availableGroupPermissions = groupPermissions.filter(
    gp => !userGroupPermissions.some(ugp => ugp.id === gp.id)
  );

  return (
    <div className="flex flex-col gap-4 px-4 pt-4">
      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <div className="flex flex-col gap-1">
          <FieldLabel htmlFor="groupPermissionId">Grupo de Permissões</FieldLabel>
          <small className="text-muted-foreground text-xs">
            Selecione e adicione grupos de permissões ao usuário.
          </small>
        </div>
        <div className="flex flex-col gap-2 min-w-0">
          <Field>
            <FieldContent>
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <NativeSelect
                    id="groupPermissionId"
                    value={selectedGroupPermissionId}
                    onChange={(e) => setSelectedGroupPermissionId(e.target.value)}
                    disabled={availableGroupPermissions.length === 0 || isLoading}
                  >
                    {availableGroupPermissions.length === 0 ? (
                      <NativeSelectOption value="">Nenhum grupo encontrado</NativeSelectOption>
                    ) : (
                      <>
                        <NativeSelectOption value="">Selecione um grupo de permissões</NativeSelectOption>
                        {availableGroupPermissions.map((groupPermission) => (
                          <NativeSelectOption key={groupPermission.id} value={groupPermission.id}>
                            {groupPermission.name}
                          </NativeSelectOption>
                        ))}
                      </>
                    )}
                  </NativeSelect>
                </div>
                <Button
                  type="button"
                  onClick={handleAssociate}
                  disabled={!selectedGroupPermissionId || isAssociating || isLoading || availableGroupPermissions.length === 0}
                  className="shrink-0"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </FieldContent>
          </Field>
        </div>
      </div>

      <hr className="border-dashed border-zinc-300" />

      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <p className="text-sm text-muted-foreground">Carregando grupos de permissões...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium">Todos os Grupos de permissões</h3>
            <small className="text-muted-foreground text-xs">
              Lista de todos os grupos de permissões associados a este usuário
            </small>
          </div>

          {userGroupPermissions.length > 0 ? (
            <div className="flex flex-col gap-2">
              {userGroupPermissions.map((groupPermission) => (
                <div
                  key={groupPermission.id}
                  className="flex items-center justify-between p-3 border border-zinc-300 rounded-md"
                >
                  <span className="text-sm font-medium">{groupPermission.name}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUnassociate(groupPermission.id)}
                        disabled={isUnassociating === groupPermission.id}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-transparent bg-transparent"
                        aria-label="Desassociar o grupo de permissão do usuário"
                      >
                        <Trash2 className="size-4.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Desassociar o grupo de permissão do usuário</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="Nenhum grupo de permissões associado" />
          )}
        </div>
      )}
    </div>
  );
}

