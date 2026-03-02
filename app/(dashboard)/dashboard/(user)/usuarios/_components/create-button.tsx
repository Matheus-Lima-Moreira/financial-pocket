"use client";

import { groupPermissionReadAllAction } from "@/backend/group-permission/actions/group-permission-read-all.action";
import { GroupPermissionDto } from "@/backend/group-permission/dtos/group-permission.dto";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { userInviteAction } from "@/backend/user/actions/user-invite.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { showSnackbarToast } from "@/components/ui/snackbar-toast";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type CreateButtonProps = {
  href: string;
  text: string;
};

export function CreateButton({ href, text }: CreateButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [groupPermissionId, setGroupPermissionId] = useState("");
  const [groupPermissions, setGroupPermissions] = useState<GroupPermissionDto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gerar um ID único para este componente para evitar conflitos quando usado múltiplas vezes
  const componentId = React.useId();

  useEffect(() => {
    if (open) {
      async function fetchGroupPermissions() {
        const result = await groupPermissionReadAllAction();
        setGroupPermissions(result.data || []);
      }
      fetchGroupPermissions();
    }
  }, [open]);

  async function handleSubmit() {
    if (!email.trim() || !name.trim() || !position.trim() || !groupPermissionId) {
      showSnackbarToast({
        message: "Preencha todos os campos obrigatórios",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await userInviteAction({
        email: email.trim(),
        name: name.trim(),
        position: position.trim(),
        groupPermissionId,
      });

      if (result.code === StatusCode.SUCCESS) {
        showSnackbarToast({
          message: "Convite enviado com sucesso",
        });
        setOpen(false);
        setEmail("");
        setName("");
        setPosition("");
        setGroupPermissionId("");
        router.refresh();
      } else {
        showSnackbarToast({
          message: result.message || "Erro ao enviar convite",
        });
      }
    } catch (error) {
      showSnackbarToast({
        message: "Erro ao enviar convite. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="h-9 text-xs font-normal">
          <IconCirclePlusFilled /> {text}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convidar Usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados para convidar um novo usuário ao sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor={`${componentId}-name`} className="text-sm font-medium">
              Nome <span className="text-red-500">*</span>
            </label>
            <Input
              id={`${componentId}-name`}
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${componentId}-email`} className="text-sm font-medium">
              E-mail <span className="text-red-500">*</span>
            </label>
            <Input
              id={`${componentId}-email`}
              type="email"
              placeholder="usuario@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${componentId}-position`} className="text-sm font-medium">
              Cargo <span className="text-red-500">*</span>
            </label>
            <Input
              id={`${componentId}-position`}
              type="text"
              placeholder="Ex: Arquiteto, Financeiro, etc."
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${componentId}-groupPermission`} className="text-sm font-medium">
              Grupo de Permissão <span className="text-red-500">*</span>
            </label>
            <NativeSelect
              id={`${componentId}-groupPermission`}
              value={groupPermissionId}
              onChange={(e) => setGroupPermissionId(e.target.value)}
              className="w-full"
            >
              <NativeSelectOption key="group-permission-placeholder" value="">
                Selecione um grupo de permissão
              </NativeSelectOption>
              {groupPermissions.map((group) => (
                <NativeSelectOption key={`group-permission-${group.id}`} value={group.id}>
                  {group.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>
        <DialogFooter className="border-t border-zinc-300 py-2">
          <div className="flex justify-end gap-4">
            <Button size={"sm"} className="h-9" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              size={"sm"}
              className="h-9"
              onClick={handleSubmit}
              disabled={!email.trim() || !name.trim() || !position.trim() || !groupPermissionId || isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Convidar"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

