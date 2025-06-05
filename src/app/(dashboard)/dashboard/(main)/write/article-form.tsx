"use client";
import { useAppForm } from "~/components/forms";
import { z } from "zod";
import { createPostSchema } from "~/data-access/dto/post.dto";
import { ArticleFields } from "./article-fields";
import { ArticleEditor } from "./article-editor";
import { ArticleSubmit } from "./article-submit";

export type FormData = z.infer<typeof createPostSchema>;

export function ArticleForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const form = useAppForm<FormData>({
    validators: {
      onChange: createPostSchema,
    },
    onSubmit: async ({ value }) => {
      // Always send image as empty string
      onSubmit({ ...value, image: "" });
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      <ArticleFields form={form} />
      <ArticleEditor form={form} />
      <ArticleSubmit form={form} />
    </form>
  );
}
