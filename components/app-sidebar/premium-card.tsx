"use client";

import { IconFlame, IconX } from "@tabler/icons-react";
import { useState } from "react";

export function PremiumCard() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="mb-4 w-full flex flex-col gap-2 px-4 py-4 border border-zinc-300 rounded-lg bg-zinc-900 relative">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <IconX className="size-4 text-zinc-400" />
      </button>
      <div className="w-full flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-amber-500 rounded-md text-white px-2.5 py-1 text-sm font-medium">
          <IconFlame className="size-4" />
          20 Dias Restantes
        </div>
      </div>

      <p className="text-zinc-300 text-sm">
        Atualize para o premium para continuar utilizando o sistema.
      </p>
    </div>
  );
}

