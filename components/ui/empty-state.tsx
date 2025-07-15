import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  icon?: LucideIcon;
  iconClassName?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "centered";
}

export function EmptyState({
  icon: Icon,
  iconClassName,
  title,
  description,
  action,
  secondaryAction,
  children,
  className,
  variant = "default",
}: EmptyStateProps) {
  const containerClasses = {
    default: "flex flex-col items-center justify-center p-6 sm:p-8 text-center",
    subtle: "flex flex-col items-center justify-center p-4 sm:p-6 text-center",
    centered: "flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] p-6 sm:p-8 text-center",
  };

  const iconSizes = {
    default: "h-10 w-10 sm:h-12 sm:w-12",
    subtle: "h-8 w-8 sm:h-10 sm:w-10",
    centered: "h-12 w-12 sm:h-16 sm:w-16",
  };

  const titleSizes = {
    default: "text-base sm:text-lg font-semibold",
    subtle: "text-sm sm:text-base font-medium",
    centered: "text-lg sm:text-xl font-semibold",
  };

  return (
    <div className={cn(containerClasses[variant], className)}>
      {Icon && (
        <div className="flex items-center justify-center mb-4">
          <div className={cn(
            "rounded-full p-3",
            variant === "subtle" ? "bg-muted" : "bg-muted/50"
          )}>
            <Icon 
              className={cn(
                iconSizes[variant],
                "text-muted-foreground",
                iconClassName
              )} 
            />
          </div>
        </div>
      )}
      
      <h3 className={cn(titleSizes[variant], "mb-2")}>{title}</h3>
      
      {description && (
        <p className={cn(
          "text-muted-foreground mb-4 sm:mb-6",
          variant === "subtle" ? "text-xs sm:text-sm max-w-xs sm:max-w-sm" : "text-sm sm:text-base max-w-sm sm:max-w-md"
        )}>
          {description}
        </p>
      )}

      {children && <div className="mb-4 sm:mb-6">{children}</div>}

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          {action && (
            <Button
              onClick={action.onClick}
              asChild={!!action.href}
              size={variant === "subtle" ? "sm" : "default"}
              className="w-full sm:w-auto"
            >
              {action.href ? (
                <a href={action.href}>{action.label}</a>
              ) : (
                <span>{action.label}</span>
              )}
            </Button>
          )}
          
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
              asChild={!!secondaryAction.href}
              size={variant === "subtle" ? "sm" : "default"}
              className="w-full sm:w-auto"
            >
              {secondaryAction.href ? (
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              ) : (
                <span>{secondaryAction.label}</span>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}