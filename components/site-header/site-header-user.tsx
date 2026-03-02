"use server";

import { userProfileAction } from "@/backend/user/actions/user-profile.action";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { IconChevronDown, IconFileText, IconHelp, IconLock, IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogoutButton } from "./logout-button";


type PropsDropMenu = {
  children: React.ReactNode;
}



function DropMenuUser({ children }: PropsDropMenu) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <IconUserCircle />
            <Link href="/dashboard/perfil">Meu Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <IconLock />
            <Link href="/dashboard/perfil?tab=trocar-senha">Trocar a senha</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <IconHelp />
            <Link href="/suporte">Suporte</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <IconFileText />
            <Link href="/termos-de-uso">Termos de uso</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export async function SiteHeaderUser() {
  const profile = await userProfileAction();

  return (
    <DropMenuUser>
      <div className="flex items-center gap-3 px-4 lg:px-0 lg:pr-2 cursor-pointer hover:bg-zinc-50 hover:text-accent-foreground p-2">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src={profile.data?.avatar}
            alt={profile.data?.name}
          />
          <AvatarFallback className="rounded-full">
            {profile.data?.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex flex-col items-start text-left">
          <span className="text-sm font-medium truncate max-w-[200px]">
            {profile.data?.name}
          </span>
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
            {profile.data?.email}
          </span>
        </div>
        <IconChevronDown className="ml-auto size-4" />
      </div>
    </DropMenuUser>
  );
}

