"use client";

import { groupPermissionRemoveAction } from "@/backend/group-permission/actions/group-permission-remove.action";
import { StatusCode } from "@/backend/shared/enum/status-code";
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
import { showSnackbarToast } from "@/components/ui/snackbar-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  groupPermissionId: string;
  groupPermissionName: string;
  onSuccess?: () => void;
};

export function GroupPermissionRemoveButton({
  groupPermissionId,
  groupPermissionName,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleRemove() {
    setIsLoading(true);
    const result = await groupPermissionRemoveAction(groupPermissionId);

    if (result.code === StatusCode.SUCCESS) {
      showSnackbarToast({
        message: "Grupo de permissões removido com sucesso",
      });
      setOpen(false);
      setIsLoading(false);
      onSuccess?.();
      router.refresh();
      return;
    }

    showSnackbarToast({
      message: result.message || "Erro ao remover grupo de permissões",
    });
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-transparent bg-transparent"
              aria-label="Remover grupo de permissões"
            >
              <IconTrash className="size-4.5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Remover</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader className="bg-muted/50 -mx-4 -mt-4 rounded-t-xl border-b border-zinc-300 p-4">
          <div className="flex items-center gap-2">
            <DialogTitle>Remover grupo de permissões</DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription className="text-zinc-800">
          Tem certeza que deseja remover o grupo de permissões{" "}
          <strong>{groupPermissionName}</strong>? Esta ação não pode ser desfeita.
        </DialogDescription>
        <DialogFooter className="border-t border-zinc-300 py-2">
          <div className="flex justify-end gap-4">
            <Button
              size="sm"
              className="h-9"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              className="h-9"
              variant="destructive"
              onClick={handleRemove}
              disabled={isLoading}
            >
              {isLoading ? "Removendo..." : "Remover"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

