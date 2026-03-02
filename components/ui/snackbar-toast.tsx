"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { toast } from "sonner";

type SnackbarToastProps = {
  message: string;
  position?: "top-center" | "top-left" | "top-right" | "bottom-center" | "bottom-left" | "bottom-right";
  duration?: number;
  onDismiss?: () => void;
};

export function showSnackbarToast({
  message,
  position = "top-center",
  duration = 3000,
  onDismiss,
}: SnackbarToastProps) {
  return toast.custom(
    (t) => (
      <div
        className="w-full md:w-auto md:max-w-[350px]"
        style={{
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <div
          className={cn(
            "flex items-center gap-2.5 bg-zinc-900 text-white border-x-0 border-t-0 border-b border-zinc-800 rounded-none px-4 py-2.5 shadow-lg",
            "w-full md:min-w-[180px] md:max-w-[350px] md:rounded-md md:border md:border-zinc-800 md:px-3 md:py-2",
            "animate-in slide-in-from-top-2 fade-in-0"
          )}
        >
          <span className="text-sm font-normal flex-1">{message}</span>
          <button
            onClick={() => {
              toast.dismiss(t);
              onDismiss?.();
            }}
            className="text-zinc-400 hover:text-white transition-colors p-1 rounded hover:bg-zinc-800"
            aria-label="Fechar"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    ),
    {
      position,
      duration,
      unstyled: true,
      className: "snackbar-toast-mobile",
    }
  );
}

