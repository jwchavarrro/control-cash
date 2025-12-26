/**
 * @file index.tsx
 * @description Componente genérico de input de texto que extiende el Input base de shadcn/ui
 */

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface InputTextProps
  extends Omit<React.ComponentProps<typeof Input>, "size"> {
  readonly label?: string;
  readonly error?: string;
  readonly helperText?: string;
  readonly required?: boolean;
  readonly size?: "sm" | "md" | "lg";
  readonly variant?: "default" | "outline" | "filled";
}

/**
 * Componente genérico de input de texto
 *
 * @example
 * ```tsx
 * <InputText
 *   label="Email"
 *   type="email"
 *   placeholder="Ingresa tu email"
 *   required
 * />
 *
 * <InputText
 *   label="Contraseña"
 *   type="password"
 *   error="La contraseña es requerida"
 *   helperText="Mínimo 8 caracteres"
 * />
 * ```
 */
export function InputText({
  label,
  error,
  helperText,
  required,
  size = "md",
  variant = "default",
  className,
  id,
  ...props
}: InputTextProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  const sizeStyles = {
    sm: "h-8 text-sm",
    md: "h-9 text-base md:text-sm",
    lg: "h-11 text-base",
  };

  const variantStyles = {
    default: "",
    outline: "border-2",
    filled: "bg-muted/50 border-transparent",
  };

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            error && "text-destructive"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <Input
        id={inputId}
        className={cn(
          sizeStyles[size],
          variantStyles[variant],
          "focus-visible:ring-[1px] rounded-full pl-5",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={cn(errorId, helperId)}
        {...props}
      />

      {error && (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className="text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
}
