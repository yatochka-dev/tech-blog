import React from "react";
import { useFieldContext } from "~/components/forms";
import { cn } from "~/lib/utils";

interface FieldInfoProps {
  helperText?: string;
}

function FieldInfo({ helperText }: FieldInfoProps) {
  const field = useFieldContext();
  const hasErrors = field.state.meta.errors.length > 0;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const errorMessage = (field.state.meta.errors[0]?.message as string) ?? "";
  const shouldShowHelper = helperText?.trim();

  return (
    <div className="min-h-[1em] text-xs transition-all duration-200">
      <p
        className={cn(
          "truncate",
          hasErrors ? "text-destructive" : "text-muted-foreground",
          !hasErrors && !shouldShowHelper && "opacity-0",
        )}
      >
        {hasErrors ? errorMessage : helperText}
      </p>
    </div>
  );
}

export default FieldInfo;
