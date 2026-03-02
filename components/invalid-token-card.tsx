import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, XCircle } from "lucide-react";
import Link from "next/link";

type InvalidTokenCardVariant = "error" | "warning" | "default";

type InvalidTokenCardProps = {
  title: string;
  message: string;
  returnLinkLabel: string;
  returnLinkHref: string;
  variant?: InvalidTokenCardVariant;
};

const variantConfig = {
  error: {
    icon: XCircle,
    iconColor: "text-destructive",
    borderColor: "border-destructive/10",
    bgColor: "text-destructive/5",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    borderColor: "border-yellow-500/10",
    bgColor: "text-yellow-500/5",
  },
  default: {
    icon: AlertCircle,
    iconColor: "text-primary",
    borderColor: "border-primary/10",
    bgColor: "text-primary/5",
  },
};

export function InvalidTokenCard({
  title,
  message,
  returnLinkLabel,
  returnLinkHref,
  variant = "error",
}: InvalidTokenCardProps) {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <div className="w-full max-w-2xl flex justify-center">
      <div className="w-full max-w-md relative md:mt-16">
        <Card className="p-0 pt-6 border-none shadow-md overflow-hidden">
          <div className={cn("w-full flex justify-center relative")}>
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
                className={config.bgColor}
              />
            </svg>
            <div className="bg-white rounded-full p-2 z-10 relative">
              <div className={cn("border rounded-full p-4", config.borderColor)}>
                <IconComponent className={cn("size-10", config.iconColor)} />
              </div>
            </div>
          </div>
          <CardHeader className="space-y-1 px-8 pb-6 text-center">
            <CardTitle className="text-2xl text-gray-800 text-center font-bold">
              {title}
            </CardTitle>
            <p className="text-base text-muted-foreground mt-2">
              {message}
            </p>
          </CardHeader>
          <CardFooter className="w-full bg-gray-50 gap-2 px-8 py-4 flex justify-center border-t border-sidebar-border/50">
            <p className="text-sm text-muted-foreground">
              <Link href={returnLinkHref} className="text-primary font-semibold underline-offset-4 hover:underline">
                {returnLinkLabel}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

