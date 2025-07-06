import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}
