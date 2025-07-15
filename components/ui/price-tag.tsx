"use client";

import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingDown, 
  Zap, 
  Tag,
  Percent,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface PriceTagProps {
  price: number | string;
  originalPrice?: number | string;
  currency?: string;
  locale?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "sale" | "bundle" | "minimal" | "inline" | "hero";
  showCurrency?: boolean;
  showDiscount?: boolean;
  discountLabel?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  className?: string;
  priceClassName?: string;
  originalPriceClassName?: string;
  animate?: boolean;
  free?: boolean;
  freeText?: string;
}

const sizeClasses = {
  xs: {
    price: "text-sm",
    originalPrice: "text-xs",
    badge: "text-xs px-1.5 py-0 h-5",
    icon: "h-3 w-3"
  },
  sm: {
    price: "text-lg",
    originalPrice: "text-sm",
    badge: "text-xs",
    icon: "h-3.5 w-3.5"
  },
  md: {
    price: "text-2xl",
    originalPrice: "text-base",
    badge: "text-sm",
    icon: "h-4 w-4"
  },
  lg: {
    price: "text-3xl",
    originalPrice: "text-lg",
    badge: "text-base",
    icon: "h-5 w-5"
  },
  xl: {
    price: "text-4xl",
    originalPrice: "text-xl",
    badge: "text-lg",
    icon: "h-6 w-6"
  }
};

function formatPrice(
  value: number | string, 
  currency: string = "USD", 
  locale: string = "en-US"
): string {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: numValue % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(numValue);
}

function calculateDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export default function PriceTag({
  price,
  originalPrice,
  currency = "USD",
  locale = "en-US",
  size = "md",
  variant = "default",
  showCurrency = true,
  showDiscount = true,
  discountLabel,
  badge,
  className,
  priceClassName,
  originalPriceClassName,
  animate = true,
  free = false,
  freeText = "Free"
}: PriceTagProps) {
  const sizeConfig = sizeClasses[size];
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  const numOriginalPrice = originalPrice 
    ? (typeof originalPrice === "string" ? parseFloat(originalPrice) : originalPrice)
    : null;
  
  const hasDiscount = numOriginalPrice && numOriginalPrice > numPrice;
  const discountPercentage = hasDiscount 
    ? calculateDiscount(numPrice, numOriginalPrice)
    : 0;
  
  const savings = hasDiscount ? numOriginalPrice - numPrice : 0;

  // Free variant
  if (free || numPrice === 0) {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <span className={cn(
          "font-bold text-green-600 dark:text-green-400",
          sizeConfig.price
        )}>
          {freeText}
        </span>
        {badge && (
          <Badge variant={badge.variant || "secondary"} className={sizeConfig.badge}>
            {badge.text}
          </Badge>
        )}
      </div>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <span className={cn(
        "font-semibold",
        sizeConfig.price,
        className
      )}>
        {showCurrency ? formatPrice(price, currency, locale) : `$${numPrice}`}
      </span>
    );
  }

  // Inline variant
  if (variant === "inline") {
    return (
      <span className={cn("inline-flex items-baseline gap-2", className)}>
        <span className={cn(
          "font-semibold",
          sizeConfig.price,
          priceClassName
        )}>
          {showCurrency ? formatPrice(price, currency, locale) : `$${numPrice}`}
        </span>
        {hasDiscount && (
          <>
            <span className={cn(
              "text-muted-foreground line-through",
              sizeConfig.originalPrice,
              originalPriceClassName
            )}>
              {showCurrency ? formatPrice(originalPrice, currency, locale) : `$${numOriginalPrice}`}
            </span>
            {showDiscount && (
              <span className="text-destructive font-medium text-sm">
                -{discountPercentage}%
              </span>
            )}
          </>
        )}
      </span>
    );
  }

  // Hero variant
  if (variant === "hero") {
    return (
      <motion.div 
        className={cn("space-y-3", className)}
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-baseline gap-3">
          <span className={cn(
            "font-bold",
            sizeConfig.price,
            hasDiscount ? "text-primary" : "",
            priceClassName
          )}>
            {showCurrency ? formatPrice(price, currency, locale) : `$${numPrice}`}
          </span>
          
          {hasDiscount && (
            <span className={cn(
              "text-muted-foreground line-through",
              sizeConfig.originalPrice,
              originalPriceClassName
            )}>
              {showCurrency ? formatPrice(originalPrice, currency, locale) : `$${numOriginalPrice}`}
            </span>
          )}
        </div>

        {hasDiscount && (
          <div className="flex flex-wrap gap-2">
            <Badge variant="destructive" className="gap-1">
              <TrendingDown className={sizeConfig.icon} />
              {discountPercentage}% OFF
            </Badge>
            <Badge variant="outline" className="gap-1 text-green-600 border-green-600/20 bg-green-50 dark:bg-green-950/20">
              <DollarSign className={sizeConfig.icon} />
              Save {formatPrice(savings, currency, locale)}
            </Badge>
            {discountLabel && (
              <Badge variant="secondary" className="gap-1">
                <Zap className={sizeConfig.icon} />
                {discountLabel}
              </Badge>
            )}
          </div>
        )}

        {badge && (
          <Badge variant={badge.variant || "secondary"}>
            {badge.text}
          </Badge>
        )}
      </motion.div>
    );
  }

  // Sale variant
  if (variant === "sale" && hasDiscount) {
    return (
      <div className={cn("inline-flex flex-col gap-1", className)}>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className={cn("gap-1", sizeConfig.badge)}>
            <Tag className={sizeConfig.icon} />
            SALE
          </Badge>
          {showDiscount && (
            <span className="text-destructive font-bold">
              -{discountPercentage}%
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className={cn(
            "font-bold text-destructive",
            sizeConfig.price,
            priceClassName
          )}>
            {showCurrency ? formatPrice(price, currency, locale) : `$${numPrice}`}
          </span>
          <span className={cn(
            "text-muted-foreground line-through",
            sizeConfig.originalPrice,
            originalPriceClassName
          )}>
            {showCurrency ? formatPrice(originalPrice, currency, locale) : `$${numOriginalPrice}`}
          </span>
        </div>
      </div>
    );
  }

  // Bundle variant
  if (variant === "bundle") {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center gap-2">
          <DollarSign className={cn("text-primary", sizeConfig.icon)} />
          <span className="text-sm font-medium text-muted-foreground">
            Bundle Price
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className={cn(
            "font-bold text-primary",
            sizeConfig.price,
            priceClassName
          )}>
            {showCurrency ? formatPrice(price, currency, locale) : `$${numPrice}`}
          </span>
          {hasDiscount && (
            <>
              <span className={cn(
                "text-muted-foreground line-through",
                sizeConfig.originalPrice,
                originalPriceClassName
              )}>
                {showCurrency ? formatPrice(originalPrice, currency, locale) : `$${numOriginalPrice}`}
              </span>
              <Badge 
                variant="secondary" 
                className={cn(
                  "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400",
                  sizeConfig.badge
                )}
              >
                Save {formatPrice(savings, currency, locale)}
              </Badge>
            </>
          )}
        </div>
        {badge && (
          <Badge variant={badge.variant || "secondary"} className={sizeConfig.badge}>
            {badge.text}
          </Badge>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="flex items-baseline gap-2">
        <span className={cn(
          "font-bold",
          sizeConfig.price,
          hasDiscount && "text-primary",
          priceClassName
        )}>
          {showCurrency ? formatPrice(price, currency, locale) : `$${numPrice}`}
        </span>
        
        {hasDiscount && (
          <span className={cn(
            "text-muted-foreground line-through",
            sizeConfig.originalPrice,
            originalPriceClassName
          )}>
            {showCurrency ? formatPrice(originalPrice, currency, locale) : `$${numOriginalPrice}`}
          </span>
        )}
      </div>

      {hasDiscount && showDiscount && (
        <Badge variant="destructive" className={cn("gap-1", sizeConfig.badge)}>
          <Percent className={sizeConfig.icon} />
          {discountPercentage}
        </Badge>
      )}

      {badge && (
        <Badge variant={badge.variant || "secondary"} className={sizeConfig.badge}>
          {badge.text}
        </Badge>
      )}
    </div>
  );
}

// Export utility components for common use cases
export function PriceWithSavings({
  price,
  originalPrice,
  ...props
}: PriceTagProps) {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  const numOriginalPrice = originalPrice 
    ? (typeof originalPrice === "string" ? parseFloat(originalPrice) : originalPrice)
    : null;
  
  const savings = numOriginalPrice ? numOriginalPrice - numPrice : 0;

  if (!numOriginalPrice || savings <= 0) {
    return <PriceTag price={price} {...props} />;
  }

  return (
    <div className="space-y-1">
      <PriceTag 
        price={price} 
        originalPrice={originalPrice} 
        {...props} 
      />
      <p className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
        <Zap className="h-3 w-3" />
        You save ${savings.toFixed(2)}
      </p>
    </div>
  );
}

export function PriceComparison({
  items,
  currency = "USD",
  locale = "en-US",
  className
}: {
  items: Array<{
    label: string;
    price: number | string;
    highlight?: boolean;
  }>;
  currency?: string;
  locale?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {items.map((item, index) => (
        <div key={index} className="text-center">
          <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
          <PriceTag
            price={item.price}
            currency={currency}
            locale={locale}
            size="sm"
            variant="minimal"
            className={item.highlight ? "text-primary" : ""}
          />
        </div>
      ))}
    </div>
  );
}