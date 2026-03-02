"use client";

import { Button } from "@/components/ui/button";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import Link from "next/link";

type CreateButtonProps = {
  href: string;
  text: string;
};

export function CreateButton({ href, text }: CreateButtonProps) {
  return (
    <Link href={href}>
      <Button type="button" className="h-9 text-xs font-normal">
        <IconCirclePlusFilled /> {text}
      </Button>
    </Link>
  );
}


