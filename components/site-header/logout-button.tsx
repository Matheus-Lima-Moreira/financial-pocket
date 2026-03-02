"use client";

import { logoutSessionHelper } from "@/backend/session/helpers/logout-session-helper";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "../ui/dropdown-menu";



export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await logoutSessionHelper();
    router.push("/login");
  }

  return (
    <DropdownMenuItem onClick={logout} className="cursor-pointer  text-red-500 hover:bg-zinc-50 hover:text-accent-foreground p-2">
      <IconLogout />
      Sair do sistema
    </DropdownMenuItem>
  )
}