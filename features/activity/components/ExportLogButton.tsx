"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const exportButtonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#1a2b5e] text-white hover:bg-[#111d42] shadow-sm",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ExportLogButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof exportButtonVariants> {
  asChild?: boolean;
}

export const ExportLogButton = React.forwardRef<
  HTMLButtonElement,
  ExportLogButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(exportButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

ExportLogButton.displayName = "ExportLogButton";
