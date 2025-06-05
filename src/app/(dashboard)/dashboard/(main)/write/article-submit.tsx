"use client";
import { FormApi } from "~/components/forms";
import type {FormData} from "./article-form";

export function ArticleSubmit({ form }: { form: FormApi<FormData> }) {
  return (
    <form.AppForm>
      <form.SubmitButton className="w-full" onClick={() => void form.handleSubmit()}>
        Submit Article
      </form.SubmitButton>
    </form.AppForm>
  );
}
