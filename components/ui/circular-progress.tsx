"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CircularProgressProps {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  showPercentage?: boolean
  variant?: "default" | "success" | "warning" | "destructive"
  className?: string
  label?: string
}

const CircularProgress = React.forwardRef<
  SVGSVGElement,
  CircularProgressProps
>(({ 
  value = 0, 
  max = 100,
  size = 120,
  strokeWidth = 8,
  showPercentage = true,
  variant = "default",
  className,
  label
}, ref) => {
  const percentage = Math.round((value / max) * 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const colors = {
    default: "stroke-primary",
    success: "stroke-green-500 dark:stroke-green-600",
    warning: "stroke-yellow-500 dark:stroke-yellow-600",
    destructive: "stroke-destructive"
  }

  return (
    <div className={cn("relative inline-flex flex-col items-center gap-2", className)}>
      <div className="relative">
        <svg
          ref={ref}
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-secondary fill-none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              "fill-none transition-all duration-300 ease-in-out",
              colors[variant]
            )}
            strokeLinecap="round"
          />
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold">{percentage}%</span>
          </div>
        )}
      </div>
      {label && (
        <span className="text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  )
})
CircularProgress.displayName = "CircularProgress"

export { CircularProgress }