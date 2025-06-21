"use client";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextInput } from "~/components/forms/fields/text-input";
import { PasswordInput } from "~/components/forms/fields/password-input";
import { SubmitButton } from "~/components/forms/submit-button";
import TextareaField from "~/components/forms/fields/textarea";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextInput,
    PasswordInput,
    TextareaField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
