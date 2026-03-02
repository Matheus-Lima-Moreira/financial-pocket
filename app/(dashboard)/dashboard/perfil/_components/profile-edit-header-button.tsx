"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useProfileContext } from "./profile-content";

export default function ProfileEditHeaderButton() {
  const { isEditing, setIsEditing } = useProfileContext();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => setIsEditing(!isEditing)}
      className="h-9"
    >
      <Pencil className="size-4" />
      <span>{isEditing ? "Cancelar" : "Editar"}</span>
    </Button>
  );
}

