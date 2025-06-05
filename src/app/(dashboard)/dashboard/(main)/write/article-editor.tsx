"use client";
import dynamic from "next/dynamic";
import { FormApi } from "@/components/forms";
import { FormData } from "./article-form";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export function ArticleEditor({ form }: { form: FormApi<FormData> }) {
  return (
    <form.AppField name="content">
      {(fieldApi) => (
        <div className="flex flex-col gap-2">
          <label className="font-medium">Content</label>
          <ReactQuill
            theme="snow"
            value={fieldApi.value || ""}
            onChange={fieldApi.setValue}
            className="bg-white"
          />
        </div>
      )}
    </form.AppField>
  );
}
