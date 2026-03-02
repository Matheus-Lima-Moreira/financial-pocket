"use client";

import { StatusCode } from "@/backend/shared/enum/status-code";
import { userAvatarRemoveAction } from "@/backend/user/actions/user-avatar-remove.action";
import { userAvatarUploadAction } from "@/backend/user/actions/user-avatar-upload.action";
import { UserReplyDto } from "@/backend/user/dtos/user-reply.dto";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { showSnackbarToast } from "@/components/ui/snackbar-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2, Upload, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type UserAvatarUploadProps = {
  user: UserReplyDto;
}

export default function UserAvatarUpload({ user }: UserAvatarUploadProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const currentAvatarUrl = preview || user.avatar || "";
  const isDefaultAvatar = currentAvatarUrl.includes("avatar.webp");
  const showRemoveButton = currentAvatarUrl && !isDefaultAvatar;

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      showSnackbarToast({
        message: "Por favor, selecione apenas arquivos de imagem",
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showSnackbarToast({
        message: "A imagem deve ter no máximo 5MB",
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    setIsUploading(true);

    // Criar preview local
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await userAvatarUploadAction(user.id, formData);

      if (result.code !== StatusCode.SUCCESS) {
        setPreview(null);
        showSnackbarToast({
          message: result.message || "Erro ao fazer upload da imagem",
          position: "top-center",
          duration: 3000,
        });
        return;
      }

      showSnackbarToast({
        message: "Foto de perfil atualizada com sucesso!",
        position: "top-center",
        duration: 3000,
      });

      router.refresh();
    } catch (error) {
      setPreview(null);
      showSnackbarToast({
        message: "Erro ao fazer upload da imagem",
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);

    try {
      const result = await userAvatarRemoveAction(user.id);

      if (result.code !== StatusCode.SUCCESS) {
        showSnackbarToast({
          message: result.message || "Erro ao remover a foto",
          position: "top-center",
          duration: 3000,
        });
        return;
      }

      setPreview(null);
      showSnackbarToast({
        message: "Foto de perfil removida com sucesso!",
        position: "top-center",
        duration: 3000,
      });

      router.refresh();
    } catch (error) {
      showSnackbarToast({
        message: "Erro ao remover a foto",
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsRemoving(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="grid gap-4 md:grid-cols-[200px_1fr]">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Foto de Perfil</label>
      </div>

      <div className="flex items-start gap-4 min-w-0">
        <div className="relative shrink-0">
          <Avatar className="size-20 border-2 border-zinc-300">
            <AvatarImage
              src={preview || user.avatar || ""}
              alt={user.name}
            />
            <AvatarFallback className="bg-muted text-base">
              {user.name ? getInitials(user.name) : <User className="size-6" />}
            </AvatarFallback>
          </Avatar>
          {showRemoveButton && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
                  onClick={handleRemove}
                  disabled={isUploading || isRemoving}
                  className="absolute -bottom-1 -right-1 size-6 rounded-full shadow-md bg-white hover:bg-zinc-50 border-zinc-300"
                >
                  <Trash2 className="size-3 text-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remover imagem</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || isRemoving}
              className="flex-1 sm:flex-initial"
            >
              <Upload className="size-4" />
              <span className="hidden sm:inline">{isUploading ? "Enviando..." : "Fazer upload"}</span>
              <span className="sm:hidden">{isUploading ? "..." : "Upload"}</span>
            </Button>
          </div>
          <small className="text-muted-foreground text-xs">
            Faça upload de uma nova foto ou remova a atual. PNG, JPG até 5MB. Dimensões recomendadas: 300x300 ou 150x150
          </small>
        </div>
      </div>
    </div>
  );
}

