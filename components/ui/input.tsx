import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "dark:bg-input/30 border-zinc-300 focus-visible:ring-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] file:text-sm file:font-medium focus-visible:ring-2 aria-invalid:ring-1 md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-10 text-base px-2.5 py-1 file:h-7",
        xs: "h-6 px-2 py-0.5 text-xs file:h-5 file:text-xs rounded-[min(var(--radius-md),8px)]",
        sm: "h-8 px-2.5 py-1 text-sm file:h-6 file:text-xs rounded-[min(var(--radius-md),10px)]",
        lg: "h-12 px-3 py-2 text-base file:h-8 file:text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Input({
  className,
  type,
  size,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
