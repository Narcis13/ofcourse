"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        default: "h-2",
        sm: "h-1",
        lg: "h-3",
        xl: "h-4"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-green-500 dark:bg-green-600",
        warning: "bg-yellow-500 dark:bg-yellow-600",
        destructive: "bg-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  value?: number
  max?: number
  showPercentage?: boolean
  label?: string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value = 0, 
  max = 100,
  size,
  variant,
  showPercentage = false,
  label,
  ...props 
}, ref) => {
  const percentage = Math.round((value / max) * 100)
  
  return (
    <div className="space-y-1">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showPercentage && (
            <span className="font-medium">{percentage}%</span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressIndicatorVariants({ variant }))}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
