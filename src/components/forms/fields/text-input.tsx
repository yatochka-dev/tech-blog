import type React from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { useFieldContext } from "~/components/forms";
import FieldInfo from "~/components/forms/fields/field-info";

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  helperText?: string;
}

function TextInput({
  id,
  label,
  className,
  labelClassName,
  containerClassName,
  helperText,
  required,
  ...props
}: TextInputProps) {
  const field = useFieldContext<string>();
  return (
    <div className={cn("grid w-full gap-1.5", containerClassName)}>
      {label && (
        <Label htmlFor={id} className={cn(labelClassName)}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={id}
        type="text"
        className={cn(className)}
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
        onBlur={() => {
          field.handleBlur();
        }}
        {...props}
      />
      <FieldInfo helperText={helperText} />
    </div>
  );
}

export { TextInput };
