"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import {type buttonVariants} from "~/components/ui/button";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useStore } from "@tanstack/react-form";
import { useFormContext } from "~/components/forms/index";
import type {VariantProps} from "class-variance-authority";

type ButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
  asChild?: boolean
};
export interface SubmitButtonProps extends ButtonProps {
  /**
   * The text to display on the button
   */
  text?: string;
  /**
   * The text to display when the form is submitting
   */
  loadingText?: string;
  /**
   * The text to display when the form submission is successful
   */
  successText?: string;
  /**
   * The error message to display when the form submission fails
   */
  errorMessage?: string;
  /**
   * Whether the form is currently submitting
   */
  isSubmitting?: boolean;
  /**
   * Whether the form submission was successful
   */
  isSuccess?: boolean;
  /**
   * Whether the form submission failed
   */
  isError?: boolean;
  /**
   * The duration in milliseconds to show the success state before resetting
   */
  successDuration?: number;
  /**
   * The duration in milliseconds to show the error state before resetting
   */
  errorDuration?: number;
  /**
   * Additional class names for the button content
   */
  contentClassName?: string;
}

export function SubmitButton({
  text = "Submit",
  loadingText = "Submitting...",
  successText = "Success!",
  errorMessage = "An error occurred",
  isSuccess = false,
  isError = false,
  successDuration = 2000,
  errorDuration = 4000,
  className,
  contentClassName,
  children,
  variant,
  ...props
}: SubmitButtonProps) {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(errorMessage);

  // Handle success state
  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setShowError(false);

      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, successDuration);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, successDuration]);

  // Handle error state
  useEffect(() => {
    if (isError) {
      setShowError(true);
      setShowSuccess(false);
      setErrorMsg(errorMessage);

      const timer = setTimeout(() => {
        setShowError(false);
      }, errorDuration);

      return () => clearTimeout(timer);
    }
  }, [isError, errorMessage, errorDuration]);

  // Determine button state
  const buttonState = isSubmitting
    ? "submitting"
    : showSuccess
      ? "success"
      : showError
        ? "error"
        : "idle";

  // Determine button variant based on state
  const buttonVariant =
    buttonState === "success"
      ? "default"
      : buttonState === "error"
        ? "destructive"
        : (variant ?? "default");

  // The content to display
  const buttonContent = children ?? text;

  return (
    <Button
      type="submit"
      disabled={isSubmitting ?? !canSubmit}
      className={cn("relative", className)}
      variant={buttonVariant}
      {...props}
    >
      <span
        className={cn(
          "flex items-center justify-center gap-2 transition-all",
          buttonState !== "idle" && "opacity-0",
          contentClassName,
        )}
      >
        {buttonContent}
      </span>

      {buttonState === "submitting" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </span>
      )}

      {buttonState === "success" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Check className="mr-2 h-4 w-4" />
          {successText}
        </span>
      )}

      {buttonState === "error" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <AlertCircle className="mr-2 h-4 w-4" />
          {errorMsg}
        </span>
      )}
    </Button>
  );
}
