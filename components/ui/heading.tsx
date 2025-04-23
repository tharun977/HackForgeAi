import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes, forwardRef } from "react"

const headingVariants = cva(
  "font-cal-sans tracking-tight",
  {
    variants: {
      size: {
        h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
        h2: "text-3xl md:text-4xl font-bold",
        h3: "text-2xl md:text-3xl font-semibold",
        h4: "text-xl md:text-2xl font-semibold",
        h5: "text-lg md:text-xl font-medium",
        h6: "text-base md:text-lg font-medium",
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        accent: "text-accent",
        primary: "text-primary",
        secondary: "text-secondary",
      },
      alignment: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      }
    },
    defaultVariants: {
      size: "h3",
      color: "default",
      alignment: "left",
    },
  }
)

interface HeadingProps 
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, color, alignment, as, ...props }, ref) => {
    const Comp = as || (size as any) || "h3"
    return (
      <Comp
        className={cn(headingVariants({ size, color, alignment, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }