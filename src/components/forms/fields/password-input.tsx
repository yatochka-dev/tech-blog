"use client";

import type React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useFieldContext } from "~/components/forms";
import FieldInfo from "~/components/forms/fields/field-info";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
  helperText?: string;
}

function PasswordInput({
  id,
  label,
  error,
  className,
  containerClassName,
  helperText,
  required,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const field = useFieldContext<string>();

  return (
    <div className={cn("grid w-full gap-1.5", containerClassName)}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      )}
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          className={cn(error && "border-destructive", className)}
          value={field.state.value}
          onChange={(e) => {
            field.handleChange(e.target.value);
          }}
          onBlur={() => {
            field.handleBlur();
          }}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
      <FieldInfo helperText={helperText} />
    </div>
  );
}

export { PasswordInput };
