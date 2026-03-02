"use client";

import { cn } from "@/lib/utils";
import { AlertTriangleIcon, X } from "lucide-react";
import { useEffect } from "react";

type ErrorAlertProps = {
  message: string;
  title?: string;
  onDismiss?: () => void;
  autoDismiss?: boolean;
  dismissAfter?: number; // em milissegundos
  className?: string;
};

export function ErrorAlert({
  message,
  title = "Atenção",
  onDismiss,
  autoDismiss = true,
  dismissAfter = 5000,
  className,
}: ErrorAlertProps) {
  useEffect(() => {
    if (autoDismiss && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, dismissAfter);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissAfter, onDismiss]);

  return (
    <div
      role="alert"
      className={cn(
        "relative flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4",
        "animate-in slide-in-from-top-2 fade-in-0",
        className
      )}
    >
      <AlertTriangleIcon className="size-5 text-destructive shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-destructive mb-1">{title}</h4>
        <p className="text-sm text-destructive/90 leading-relaxed">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-destructive/70 hover:text-destructive transition-colors p-1 rounded hover:bg-destructive/10 shrink-0"
          aria-label="Fechar"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}



