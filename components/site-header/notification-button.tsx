"use client";

import { IconBell } from "@tabler/icons-react";
import { EmptyNotification } from "../empty-notification";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

type PropsDropMenu = {
  children: React.ReactNode;
}

function DropMenuNotification({ children }: PropsDropMenu) {
  // TODO: Implementar lógica de notificações
  const notifications: unknown[] = [];

  //const unreadCount = notifications.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 px-0 pt-0" align="center">
        <div className="px-4 py-2 bg-zinc-50 border-zinc-300 border-b">
          <h3 className="text-sm font-semibold">Notificações</h3>
        </div>
        <DropdownMenuGroup>
          {notifications.length > 0 ? (
            <div>
              notifications
            </div>
          ) : (
            <div className="">
              <EmptyNotification message="Nenhuma notificação" />
            </div>
          )}
        </DropdownMenuGroup>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer text-center justify-center p-2">
                Ver todas as notificações
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NotificationButton() {
  // TODO: Implementar contagem de notificações não lidas
  const unreadCount = 0;

  return (
    <DropMenuNotification>
      <div className="relative border border-zinc-300 px-2 py-1.5 rounded-md flex items-center justify-center cursor-pointer hover:text-accent-foreground">
        <IconBell size={20} className="size-5 text-zinc-500" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </div>
    </DropMenuNotification>
  );
}
