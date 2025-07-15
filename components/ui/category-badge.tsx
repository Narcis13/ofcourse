import { cn } from "@/lib/utils";
import { getCategoryColorScheme } from "@/lib/category-colors";
import { cva, type VariantProps } from "class-variance-authority";

const categoryBadgeVariants = cva(
  "inline-flex items-center transition-all font-medium",
  {
    variants: {
      variant: {
        default: "border",
        solid: "text-white border-transparent",
        subtle: "border",
        ghost: "border-transparent",
        outline: "bg-transparent",
      },
      size: {
        xs: "text-xs px-2 py-0.5 rounded",
        sm: "text-xs px-2.5 py-0.5 rounded-md",
        md: "text-sm px-3 py-1 rounded-md",
        lg: "text-base px-4 py-1.5 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export interface CategoryBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof categoryBadgeVariants> {
  categorySlug: string;
  categoryName?: string;
  showDot?: boolean;
  interactive?: boolean;
}

export function CategoryBadge({
  categorySlug,
  categoryName,
  className,
  variant = "default",
  size,
  showDot = false,
  interactive = false,
  children,
  ...props
}: CategoryBadgeProps) {
  const colors = getCategoryColorScheme(categorySlug);
  
  const getVariantStyles = () => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: colors.primary,
          color: "white",
        };
      case "subtle":
        return {
          backgroundColor: `${colors.primary}10`,
          color: colors.dark,
          borderColor: `${colors.primary}20`,
        };
      case "ghost":
        return {
          color: colors.primary,
        };
      case "outline":
        return {
          color: colors.primary,
          borderColor: colors.primary,
        };
      default: // default variant
        return {
          backgroundColor: `${colors.primary}15`,
          color: colors.dark,
          borderColor: `${colors.primary}30`,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div
      className={cn(
        categoryBadgeVariants({ variant, size }),
        interactive && "cursor-pointer hover:shadow-sm",
        interactive && variant === "default" && "hover:border-opacity-80",
        interactive && variant === "solid" && "hover:opacity-90",
        interactive && variant === "subtle" && "hover:bg-opacity-80",
        className
      )}
      style={{
        ...variantStyles,
        ...(interactive && {
          "--hover-shadow": `0 2px 8px ${colors.primary}20`,
        }),
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        if (interactive) {
          e.currentTarget.style.boxShadow = "var(--hover-shadow)";
          if (variant === "subtle" || variant === "default") {
            e.currentTarget.style.borderColor = colors.primary;
          }
        }
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          e.currentTarget.style.boxShadow = "none";
          if (variant === "subtle" || variant === "default") {
            e.currentTarget.style.borderColor = variantStyles.borderColor || "";
          }
        }
      }}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "w-2 h-2 rounded-full mr-1.5",
            variant === "solid" ? "bg-white/80" : ""
          )}
          style={{
            backgroundColor: variant !== "solid" ? colors.primary : undefined,
          }}
        />
      )}
      {children || categoryName || colors.name}
    </div>
  );
}