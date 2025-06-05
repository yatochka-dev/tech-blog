"use client";
import { z } from "zod";
import { FormApi } from "@/components/forms";
import { FormData } from "./article-form";

export function ArticleFields({ form }: { form: FormApi<FormData> }) {
  return (
    <div className="flex flex-col gap-4">
      <form.AppField name="title">
        {(fieldApi) => (
          <fieldApi.TextInput label="Title" placeholder="Enter article title" required />
        )}
      </form.AppField>
      <form.AppField name="slug">
        {(fieldApi) => (
          <fieldApi.TextInput label="Slug" placeholder="Slug (optional)" />
        )}
      </form.AppField>
      <form.AppField name="description">
        {(fieldApi) => (
          <fieldApi.TextArea label="Description" placeholder="Short description (optional)" />
        )}
      </form.AppField>
      <form.AppField name="status">
        {(fieldApi) => (
          <fieldApi.Select label="Status" required options={[
            { value: "DRAFT", label: "Draft" },
            { value: "PUBLISHED", label: "Published" },
            { value: "ARCHIVED", label: "Archived" },
          ]} />
        )}
      </form.AppField>
      <form.AppField name="tags">
        {(fieldApi) => (
          <fieldApi.TextInput label="Tags (comma separated CUIDs)" placeholder="cuid1,cuid2" onChange={e => {
            // Convert comma separated string to array
            fieldApi.setValue(e.target.value.split(",").map(v => v.trim()).filter(Boolean));
          }} />
        )}
      </form.AppField>
    </div>
  );
}
