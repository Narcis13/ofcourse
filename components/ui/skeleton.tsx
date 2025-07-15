import { cn } from "@/lib/utils"

function Skeleton({ 
  className, 
  shimmer = true,
  ...props 
}: React.ComponentProps<"div"> & { shimmer?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative bg-muted rounded-md overflow-hidden",
        shimmer && "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:animate-[shimmer_1.5s_infinite]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
