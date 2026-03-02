"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

export type TableAction = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "ghost" | "destructive";
  className?: string;
  disabled?: boolean;
};

type TableActionsProps = {
  actions: TableAction[];
  className?: string;
};

export function TableActions({ actions, className }: TableActionsProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {actions.map((action, index) => {
        const Icon = action.icon;
        const buttonContent = (
          <Button
            variant={action.variant || "ghost"}
            size="sm"
            className={cn(
              "h-8 w-8 p-0 text-muted-foreground",
              action.variant === "destructive" 
                ? "hover:text-destructive hover:bg-transparent bg-transparent" 
                : "hover:text-foreground",
              action.className
            )}
            onClick={action.onClick}
            disabled={action.disabled}
            aria-label={action.label}
          >
            <Icon className="size-4.5" />
          </Button>
        );

        const button = action.href ? (
          <Link href={action.href}>{buttonContent}</Link>
        ) : (
          buttonContent
        );

        return (
          <Tooltip key={index}>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>
              <p>{action.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

