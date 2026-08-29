// src/components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };