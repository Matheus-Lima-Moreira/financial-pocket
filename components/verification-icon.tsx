import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

type VerificationIconProps = {
  icon: LucideIcon
  className?: string
}

export function VerificationIcon({ icon: Icon, className }: VerificationIconProps) {
  const IconComponent = Icon

  return (
    <div className={cn("w-full flex justify-center relative", className)}>
      <svg
        className="absolute top-0 w-full z-0"
        style={{ transform: 'translateY(-75%)' }}
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="200"
          cy="200"
          rx="250"
          ry="150"
          fill="currentColor"
          className="text-primary/5"
        />
      </svg>
      <div className="bg-white rounded-full p-2 z-10 relative">
        <div className="border border-primary/10 rounded-full p-4">
          <IconComponent className="size-10 text-primary" />
        </div>
      </div>
    </div>
  )
}

