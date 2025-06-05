"use client";
import { ArticleForm } from "./article-form";

export default function WriteAnArticlePage() {
  // TODO: Replace with actual mutation logic (e.g., trpc)
  const handleSubmit = async (data: any) => {
    // Call your mutation here (e.g., trpc.post.create.mutateAsync)
    // For now, just log
    console.log("Submitting post:", data);
  };

  return (
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Write a New Article</h1>
        <ArticleForm onSubmit={handleSubmit} />
      </div>
  );
}